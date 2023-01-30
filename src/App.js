import './App.css';
import React, { useState, useEffect } from 'react';
import NavRoutes from './Routes-Nav/NavRoutes';
import API from "./API";
import UserContext from './UserComponents/UserContext';
import {decodeToken} from "react-jwt";
import useLocalStorage from './Hooks/useLocalStorage';

function App() {

  // adds token to local storage for continued auth routes use
  let [token, setToken] = useLocalStorage();
  let [authUser, setAuthUser] = useState(null);
  let [matchedProjectIds, setMatchedProjectIds] = useState(null)


  useEffect(function loadUserInfo() {
    async function getCurrentUser() {
      if(token){
        try {
          const {username}  = decodeToken(token);  
          setAuthUser(username);        
         // add token to Api class so it can be used to call the API.
          API.token = token;
          let userMatches = await API.viewUsernameMatches(username);
          let matchIds = userMatches.map(match => match.project_id);
          setMatchedProjectIds([...matchIds])
          console.log(matchedProjectIds, "matched id's");
        } catch (e) {
          authUser(null);
          return {message: "Unauthorized"};
        };
      };
    };
    getCurrentUser();
  }, [token]);


  // ***************************************************************

  async function registerUser(userData) {
    // includes: username, password, email, bio
    try {
      let userToken = await API.registerUser(userData);
      setToken(userToken);
      console.log("THIS IS NEW THE NEW TOKEN: ", token);
      return {success : true};
    } catch (e) {
      console.log(e);
      return {success : false, e}
    };
  };

  async function authenticeUser(userData) {
    // includes: username, password
    try {
      let userToken = await API.authenticateUser(userData);
      setToken(userToken);
      return {success : true};
    } catch (e) {
      console.log(e);
      return {success : false, e}
    };
  };

  console.log("In app user is:", authUser)

  return (
    <div className="App-header">
      <UserContext.Provider value = {{authUser, setAuthUser, matchedProjectIds, setMatchedProjectIds}}>
        <p>React live on PORT 3000</p> 
          <NavRoutes registerUser = {registerUser} authenticateUser = {authenticeUser}/>
      </UserContext.Provider>
    </div>
  );
}

export default App;
