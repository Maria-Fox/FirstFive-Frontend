import React, {Children, useContext} from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../UserComponents/UserContext";

const PrivateRoute = () => {
  let {authUser} = useContext(UserContext); 
  console.log("In private route user is", authUser)

  return authUser === true ? Children : <Navigate to = "/auth/register" ></Navigate>
};

export default PrivateRoute;

// Checks if auth user is trying to access the route. If not, navigated to login.  Once logged in, if there original URL was valid, it will redirect them there.

// let location = useLocation();
// replace state = {{path: location.pathname}}