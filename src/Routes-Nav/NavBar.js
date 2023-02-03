import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import UserContext from "../UserComponents/UserContext";
import "./NavBar.css"

const NavBar = ({ logout }) => {

  // ***************************************************************

  let { authUser } = useContext(UserContext);
  console.log("In navBar user is: ", authUser, "*****");

  // ***************************************************************

  if (!authUser) {
    return (
      <nav>
        <NavLink to="/auth/login" className="NavBar-item">Log in</NavLink>
        <NavLink to="/auth/register" className="NavBar-item">Sign up</NavLink>
      </nav>
    );
  } else {
    return (
      <nav className="">
        <NavLink to="/projects/view" className="NavBar-item">Projects</NavLink>
        <NavLink to={`/matches/view/${authUser}/all`} className="NavBar-item">Matches</NavLink>
        <NavLink to={`/messages/${authUser}/all`} className="NavBar-item">Messages</NavLink>
        <NavLink to={`/users/${authUser}`} className="NavBar-item">Profile</NavLink>
        <Link to="/auth/login" onClick={logout} className="NavBar-item">Logout</Link>
      </nav>
    );
  };
};


export default NavBar;