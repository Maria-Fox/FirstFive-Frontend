import './App.scss';
import { flushSync } from 'react-dom';
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
          // put the token on the Api class so it can use it to call the API
          API.token = token;
          console.log(API.token, "token was assigned, %%%%%%");
          // retrieve the user matches to populate approporiate projects.
          // let userMatches = await API.viewUsernameMatches(authUser);
          // let matchIds = userMatches.map(match => match.project_id);
          // setMatchedProjectIds([...matchIds]);
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