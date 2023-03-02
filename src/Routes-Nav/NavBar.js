import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import UserContext from "../UserComponents/UserContext";
import "./NavBar.css"


const NavBar = ({ logout }) => {

  // ***************************************************************

  let { authUser } = useContext(UserContext);
  let validToken = localStorage.getItem("token");

  // ***************************************************************

  if (!authUser && !validToken) {
    return (
      <nav style={{ textAlign: "right", width: "100%" }}>
        <NavLink to="/auth/login" className="NavBar-item">Login</NavLink>
        <NavLink to="/auth/register" className="NavBar-item">Register</NavLink>
        <NavLink to="/about" className="NavBar-item">About</NavLink>
      </nav >
    );
  } else {
    return (
      <nav style={{ textAlign: "right" }} >
        <NavLink to="/home" className="NavBar-item" style={{ textAlign: "left" }}>FirstFive</NavLink>

        <NavLink to="/projects/view" className="NavBar-item">Projects</NavLink>

        <NavLink to={`/matches/view/${authUser}/all`} className="NavBar-item">Matches</NavLink>

        <NavLink to={`/messages/${authUser}/all`} className="NavBar-item">Messages</NavLink>

        <NavLink to={`/users/${authUser}`} className="NavBar-item">Profile</NavLink>

        <NavLink to={`/projects/created/by/${authUser}`} className="NavBar-item">Posts</NavLink>

        <NavLink to="/dopamine/hit" className="NavBar-item">Dopamine Hit </NavLink>

        <Link to="/auth/login" onClick={logout} className="NavBar-item">Logout</Link>
      </nav>
    );
  };

};


export default NavBar;