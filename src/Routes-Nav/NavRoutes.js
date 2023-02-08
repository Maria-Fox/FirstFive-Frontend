import React, { useContext } from "react";
import UserContext from "../UserComponents/UserContext";
import { Routes, Route } from "react-router-dom";
import RegisterForm from "../UserComponents/RegisterForm";
import LoginForm from "../UserComponents/LoginForm";
import ProjectList from "../ProjectComponents/ProjectList";
import PrivateRoute from "./PrivateRoute";
import UserProfile from "../UserComponents/UserProfile";
import CreateProjectForm from "../ProjectComponents/CreateProjectForm";
import ProjectCard from "../ProjectComponents/ProjectCard";
import MatchList from "../MatchComponents/MatchedProjectList";
import MessageList from "../Messages/MessaageList";
import CreateMessage from "../Messages/CreateMessage";
import SingleMsgDetails from "../Messages/SingleMsgDetail";
import MatchedProjectUsers from "../MatchComponents/MatchedUserList";
import ProjectMemberList from "../ProjectMembers.js/ProjectMemberList";
import EditProject from "../ProjectComponents/EditProject";
import UpdateProfileForm from "../UserComponents/UpdateProfileForm";
import About from "../About/About";
import UserCreatedProjects from "../ProjectComponents/UserCreatedProjectList";
import UpdateProjectMembers from "../ProjectMembers.js/UpdateProjectMembers";

const NavRoutes = ({ registerUser, authenticateUser }) => {

  const { authUser } = useContext(UserContext)

  return (
    <Routes>

      {/* {<Route path="/projects/view" element={
        <PrivateRoute>
          <ProjectList />
        </PrivateRoute>} >
      </Route>} */}

      {/* Auth user routes */}
      <Route path="/auth/register"
        element={<RegisterForm registerUser={registerUser} />}>
      </Route>
      <Route path="/auth/login"
        element={<LoginForm authenticateuser={authenticateUser} />}>
      </Route>
      <Route path="/about"
        element={<About />}>
      </Route>


      {/* User route */}
      <Route exact path="/users/:username" element={<UserProfile />}></Route>
      <Route exact path="/users/update/:username" element={<UpdateProfileForm />}></Route>



      {/* Project Routes */}
      <Route path="/projects/new" element={<CreateProjectForm />}></Route>
      <Route path="/projects/view" element={<ProjectList />}></Route>
      <Route path="/projects/:id" element={<ProjectCard />}></Route>
      <Route path="/edit/project/:project_id" element={<EditProject />}></Route>

      <Route path="/projects/created/by/:username" element={<UserCreatedProjects />}></Route>




      {/* Match Routes */}
      <Route exact path="/matches/view/:username/all" element={<MatchList />}></Route>
      <Route exact path="/matches/view/:project_id/users" element={<MatchedProjectUsers />}></Route>



      {/* Project Member Routes */}
      <Route exact path="/projectmembers/view/all/:project_id" element={<ProjectMemberList />}></Route>
      <Route exact path="/projectmembers/update/:project_id" element={<UpdateProjectMembers />}></Route>


      {/* Message Routes */}
      <Route exact path="/messages/:username/create/:to_username" element={<CreateMessage />}></Route>
      <Route exact path="/messages/:username/all" element={<MessageList />}></Route>
      <Route exact path="/messages/:username/read/:message_id" element={<SingleMsgDetails />}></Route>




    </Routes>
  );
};

export default NavRoutes;