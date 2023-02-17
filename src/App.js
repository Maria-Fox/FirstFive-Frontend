import './App.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavRoutes from './Routes-Nav/NavRoutes';
import API from "./API";
import UserContext from './UserComponents/UserContext';
import { decodeToken } from "react-jwt";
import useLocalStorage from './Hooks/useLocalStorage';
import NavBar from './Routes-Nav/NavBar';

// ***************************************************************

// Key name for storing token in localStorage
export const token_storage = "token";

function App() {
  const [authUser, setAuthUser] = useState(null);
  const [token, setToken] = useLocalStorage(token_storage);
  const [matchedProjectIds, setMatchedProjectIds] = useState(null);
  const navigate = useNavigate();

  // ***************************************************************

  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          console.log("TRIGGERED APP EFFECT RE-RENDER")

          // Add in authUser
          let { username } = decodeToken(token);
          console.log("DESTRUCTURED FROM TOKEN", username);
          setAuthUser(username);

          // why is this NOT changing the authUser... ???
          console.log(`${authUser} is logged in.`);

          // put the token on the Api class so it can use it to call the API
          API.token = token;
          console.log(API.token, "token was assigned");

          // Even down herer (after some time from original set)
          console.log(authUser, "AUTH USER IN APP.JS");

          // retrieve the user matches to populate approporiate projects.
          // of username****
          let userMatches = await API.viewUsernameMatches(username);
          let matchIds = userMatches.map(match => match.project_id);
          setMatchedProjectIds([...matchIds])
          console.log(matchedProjectIds, "matched id's");
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
      return { success: true };
    } catch (errors) {
      return { success: false, errors };
    };
  };

  // ***************************************************************


  async function authenticateUser(formData) {
    try {
      let token = await API.authenticateUser(formData);

      // the setToken call stack is not finishing before the return statement runs!!!! - How do I ensure it finishes before moving on? If I do the commented out code below it let's us auth the user but the rest of the useEffect (matchedIds) are still needed & needs to be udpated when there's changes to tokens, etc.

      // let { username } = decodeToken(token);
      // setAuthUser(username);
      // console.log(`${username} is logged in.`)

      let updatedUser = await setToken(token);
      console.log("SHOULD TRIGGER APP EFFECT");
      return { success: true };
    } catch (errors) {
      return { success: false, errors };
    };
  };

  // ***************************************************************


  async function logout() {
    setAuthUser(null);
    localStorage.removeItem('token');
    navigate("/auth/login");
  };


  // ***************************************************************

  return (
    <UserContext.Provider
      value={{ authUser, setAuthUser, matchedProjectIds, setMatchedProjectIds }}>
      <div className="App">
        <NavBar logout={logout} />
        <NavRoutes registerUser={registerUser} authenticateUser={authenticateUser} logout={logout} />
      </div>
    </UserContext.Provider>
  );
}

export default App;