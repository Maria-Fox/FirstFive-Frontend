import React, { Children, useContext } from "react";
import { Navigate, useLocation, Route } from "react-router-dom";
import UserContext from "../UserComponents/UserContext";

const PrivateRoute = ({ exact, path }) => {
  let { authUser } = useContext(UserContext);
  let location = useLocation();

  console.log("In private route user is", authUser, "$%#%^&$^*%^^%#@$")
  console.log(authUser ? true : false)

  return authUser ? { Children } : <Navigate to="/auth/login" replace state={{ path: location.pathname }}></Navigate>
};

export default PrivateRoute;

// Checks if auth user is trying to access the route. If not, navigated to login.  Once logged in, if there original URL was valid, it will redirect them there.