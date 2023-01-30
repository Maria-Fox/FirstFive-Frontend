import React, { useContext } from "react";
import {Routes, Route} from "react-router-dom";
import Register from "../UserComponents/Register";
import Login from "../UserComponents/Login";
import ProjectList from "../ProjectComponents/ProjectList";
import PrivateRoute from "./PrivateRoute";
import UserProfile from "../UserComponents/UserProfile";

const NavRoutes = ({registerUser, authenticateUser}) => {

  return(
    <Routes>
  
      {/* {<Route path = "/projects/all" element = {
        <PrivateRoute>
          <ProjectList />
        </PrivateRoute>} >
      </Route>}   */}
      <Route path= "/projects/all" element = {<ProjectList />}></Route>

      
      
      <Route path= "/projects/view" element = {<ProjectList />}></Route>
      {/* <Route path= "/projects/new" element = {<ProjectList />}></Route> */}
      <Route path = "/users/:username" element = {<UserProfile />}></Route>



      <Route path = "/auth/register" 
          element = {<Register registerUser={registerUser}/>}>
      </Route> 
      <Route path = "/auth/login" 
          element = {<Login  authenticateuser={authenticateUser}/>}>
      </Route> 
      
  </Routes> 
  );
};

export default NavRoutes;