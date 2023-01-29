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


  useEffect(function loadUserInfo() {
    console.log("hello")
    async function getCurrentUser() {
      if(token){
        try {
          // token payload is the username.
          const {username}  = decodeToken(token);          
         // add token to Api class so it can be used to call the API.
          API.token = token;
          console.log("we have a token & assigned to class")
          let user = await API.viewUser(username);
          setAuthUser(user.username);
        } catch (e) {
          authUser(null);
          return {message: "Unauthorized"};
        }
    } else {
      console.log("no token found")
    }
    } getCurrentUser();
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

  console.log("In app user is:", authUser)

  return (
    <div className="App-header">
      <UserContext.Provider value = {{authUser, setAuthUser}}>
      <p>React live on PORT 3000</p> 
      <NavRoutes registerUser = {registerUser}/>
      </UserContext.Provider>
    </div>
  );
}

export default App;
