import React from "react";
import { Routes, Route } from "react-router-dom";
import RegisterForm from "../UserComponents/RegisterForm";
import LoginForm from "../UserComponents/LoginForm";
import ProjectList from "../ProjectComponents/ProjectList";
// import PrivateRoute from "./PrivateRoute";
import UserProfile from "../UserComponents/UserProfile";
import CreateProjectForm from "../ProjectComponents/CreateProjectForm";
import ProjectCard from "../ProjectComponents/ProjectCard";
import MatchList from "../MatchComponents/MatchList";
import MessageList from "../Messages/MessaageList";
import CreateMessage from "../Messages/CreateMessage";
import SingleMsgDetails from "../Messages/SingleMsgDetail";
import MatchedProjectUsers from "../MatchComponents/MatchedProjectUsers";
import ProjectMemberList from "../ProjectMembers.js/ProjectMemberList";

const NavRoutes = ({ registerUser, authenticateUser }) => {

  return (
    <Routes>

      {/* {<Route path = "/projects/all" element = {
        <PrivateRoute>
          <ProjectList />
        </PrivateRoute>} >
      </Route>}   */}

      {/* Auth user routes */}
      <Route path="/auth/register"
        element={<RegisterForm registerUser={registerUser} />}>
      </Route>
      <Route path="/auth/login"
        element={<LoginForm authenticateuser={authenticateUser} />}>
      </Route>

      {/* User route */}
      <Route exact path="/users/:username" element={<UserProfile />}></Route>


      {/* Project Routes */}
      <Route path="/projects/new" element={<CreateProjectForm />}></Route>
      <Route path="/projects/view" element={<ProjectList />}></Route>
      <Route path="/projects/:id" element={<ProjectCard />}></Route>

      {/* Maatch Routes */}
      <Route exact path="/matches/view/:username/all" element={<MatchList />}></Route>
      <Route exact path="/matches/view/:project_id/users" element={<MatchedProjectUsers />}></Route>

      {/* Project Member Routes */}
      <Route exact path="projectmembers/view/all/:project_id" element={<ProjectMemberList />}></Route>


      {/* Message Routes */}
      <Route exact path="/messages/:username/create" element={<CreateMessage />}></Route>
      <Route exact path="/messages/:username/all" element={<MessageList />}></Route>
      <Route exact path="/messages/:username/read/:message_id" element={<SingleMsgDetails />}></Route>




    </Routes>
  );
};

export default NavRoutes;