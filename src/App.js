import "./App.css"
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavRoutes from './Routes-Nav/NavRoutes';
import API from "./API";
import UserContext from './UserComponents/UserContext';
import { decodeToken } from "react-jwt";
import useLocalStorage from './Hooks/useLocalStorage';
import NavBar from './Routes-Nav/NavBar';

// ***************************************************************

// Key name for storing token in localStorage=> {token: "sdfsdf"}
export const token_storage = "token";
const sampleTrackItem = JSON.stringify([{ id: 1, projectName: "Sample project", note: "Message project owner for further details.", additional: "Clone github repo and review code." }]);
// const trackItems = JSON.parse(localStorage.getItem('tracker'));
// console.log(sampleTrackItem, "parsed")


function App() {
  const [authUser, setAuthUser] = useState(null);
  const [token, setToken] = useLocalStorage(token_storage);
  const [matchedProjectIds, setMatchedProjectIds] = useState([]);
  const [userNotes, setUserNotes] = useLocalStorage("tracker");

  const navigate = useNavigate();

  // ***************************************************************

  useEffect(function loadUserInfo() {
    console.debug("App useEffect", "token=", typeof (userNotes));

    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = decodeToken(token);
          setAuthUser(username);
          // put the token on the API class for user authentication on the backend. Used to send off requests.

          API.token = token;
          // retrieve the user matches to populate approporiate projects.
          // **Note - setting the authUser does not happen quickly enough to use authUser here... therefore using username.
          let userMatches = await API.viewUsernameMatches(username);
          let matchIds = userMatches.map(match => match.project_id);
          setMatchedProjectIds([...matchIds]);
          console.log(`FROM APP: MATCHEDIDS ARE:`, matchedProjectIds)
        } catch (err) {
          setAuthUser(null)
        };
      };
    };

    getCurrentUser();
  }, [token]);

  // ***************************************************************


  async function registerUser(formData) {
    try {
      let token = await API.registerUser(formData);
      setToken(token);

      let { username } = decodeToken(token);
      setAuthUser(username);
      return { success: true };
    } catch (errors) {
      return { success: false, errors };
    };
  };

  // ***************************************************************


  async function authenticateUser(formData) {
    try {
      let token = await API.authenticateUser(formData);
      setToken(token);

      // Decoding here to allow private route components to render outlet.
      let { username } = decodeToken(token);
      setAuthUser(username);
      return { success: true };
    } catch (errors) {
      return { success: false, errors };
    };
  };

  // ***************************************************************


  async function logout() {
    setAuthUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('tracker');
    API.token = "";
    navigate("/auth/login");
  };


  // ***************************************************************

  return (
    <UserContext.Provider
      value={{ authUser, setAuthUser, matchedProjectIds, setMatchedProjectIds, userNotes, setUserNotes }}>
      <div id="AppID" >
        <NavBar logout={logout} />
        <NavRoutes registerUser={registerUser} authenticateUser={authenticateUser} logout={logout} />
      </div>
    </UserContext.Provider>
  );
}

export default App;