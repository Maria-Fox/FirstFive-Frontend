import './App.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavRoutes from './Routes-Nav/NavRoutes';
import API from "./API";
import UserContext from './UserComponents/UserContext';
import { decodeToken } from "react-jwt";
import useLocalStorage from './Hooks/useLocalStorage';
import FirstFiveAPI from './API';
import NavBar from './Routes-Nav/NavBar';

// ***************************************************************

// Key name for storing token in localStorage
export const token_storage = "token";

function App() {
  const [authUser, setAuthtUser] = useState(null);
  const [token, setToken] = useLocalStorage(token_storage);
  const [matchedProjectIds, setMatchedProjectIds] = useState(null);
  const navigate = useNavigate();

  // ***************************************************************

  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = decodeToken(token);
          setAuthtUser(username);
          // put the token on the Api class so it can use it to call the API.
          FirstFiveAPI.token = token;
          let userMatches = await API.viewUsernameMatches(username);
          let matchIds = userMatches.map(match => match.project_id);
          setMatchedProjectIds([...matchIds])
          console.log(matchedProjectIds, "matched id's");
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          // setCurrentUser(null);
        }
      }
    }

    getCurrentUser();
  }, [token]);

  // ***************************************************************


  async function registerUser(formData) {
    try {
      let token = await API.registerUser(formData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    };
  };

  // ***************************************************************


  async function authenticateUser(formData) {
    try {
      let token = await API.authenticateUser(formData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    };
  };

  // ***************************************************************


  async function logout() {
    setAuthtUser(null);
    localStorage.removeItem('token');
    navigate("/auth/login");
  };


  // ***************************************************************

  return (
    <UserContext.Provider
      value={{ authUser, setAuthtUser, matchedProjectIds, setMatchedProjectIds }}>
      <div className="App-header">
        <NavBar logout={logout} />
        {/* <Example /> */}
        <NavRoutes registerUser={registerUser} authenticateUser={authenticateUser} logout={logout} />
      </div>
    </UserContext.Provider>

  );
}

export default App;