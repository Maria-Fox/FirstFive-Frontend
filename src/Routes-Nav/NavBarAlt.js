import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import UserContext from "../UserComponents/UserContext";
import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";
import "./NavBar.css";

function NavBar({ logout }) {
  const { authUser } = useContext(UserContext);

  return (
    <div>
      <Navbar expand="md" position="sticky" >
        <NavbarBrand href="/">FirstFive</NavbarBrand>
        <Nav className="ms-auto " navbar>
          {!authUser ? (
            <>
              <NavItem className="px-2 NavBar-item">
                <NavLink exact to="/auth/login">
                  Log in
                </NavLink>
              </NavItem>

              <NavItem className="px-2 NavBar-item">
                <NavLink exact to="/auth/register">
                  Register
                </NavLink>
              </NavItem>

              <NavItem className="px-2">
                <NavLink exact to="/about">
                  About
                </NavLink>
              </NavItem>
            </>
          ) : (
            <>
              <NavItem className="px-2">
                <NavLink exact to="/projects/view">
                  Projects
                </NavLink>
              </NavItem>

              <NavItem className="px-2">
                <NavLink exact to={`/matches/view/${authUser}/all`}>
                  Matches
                </NavLink>
              </NavItem>

              <NavItem className="px-2">
                <NavLink exact to={`/messages/${authUser}/all`} >
                  Messages
                </NavLink>
              </NavItem>

              <NavItem className="px-2">
                <NavLink exact to={`/users/${authUser}`} >
                  Profile
                </NavLink>
              </NavItem>

              <NavItem className="px-2">
                <NavLink exact to={`/projects/created/by/${authUser}`} >
                  Posts
                </NavLink>
              </NavItem>

              <NavItem className="px-2">
                <NavLink exact to="/dopamine/hit" >
                  Dopamine
                </NavLink>
              </NavItem>

              <NavItem className="px-2">
                <Link to="/auth/login" onClick={logout}>
                  Log out
                </Link>
              </NavItem>
            </>
          )}
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;