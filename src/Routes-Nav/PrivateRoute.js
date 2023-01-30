import React, {Children, useContext} from "react";
import { Navigate, useLocation } from "react-router-dom";
import UserContext from "../UserComponents/UserContext";

const PrivateRoute = () => {
  let {authUser} = useContext(UserContext); 
  console.log("In private route user is", authUser)
  let location = useLocation();

  return authUser === true ? Children : <Navigate to = "/auth/register" replace state = {{path: location.pathname}}></Navigate>
};

export default PrivateRoute;

// Checks if auth user is trying to access the route. If not, navigated to login.  Once logged in, if there original URL was valid, it will redirect them there.