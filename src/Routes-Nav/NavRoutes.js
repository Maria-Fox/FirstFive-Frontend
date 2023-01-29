import React from "react";
import {Routes, Route} from "react-router-dom";
import RegisterForm from "../UserComponents/RegisterForm";
import ProjectList from "../ProjectComponents/ProjectList";

const NavRoutes = ({registerUser}) => {

  // determine if user is signed in or not to 
  return(
    <Routes>
      <Route path = "/auth/register" element = {<RegisterForm registerUser = {registerUser}/>}>
      </Route>



      <Route path = "/projects/all" element = {<ProjectList />} ></Route>


    </Routes>
  );
};

export default NavRoutes;