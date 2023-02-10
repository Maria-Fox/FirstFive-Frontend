import React, { useEffect, useContext, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import UserContext from "../UserComponents/UserContext";
import API from "../API";
import AlertNotification from "../Common/AlertNotifications";
import UserCreatedProject from "./UserCreatedProject";

// ***************************************************************

const UserCreatedProjectList = () => {

  const { authUser, matchedProjectIds, setMatchedProjectIds } = useContext(UserContext);
  const [projects, setProjects] = useState(null);
  const [errors, setErrors] = useState(null);
  const { username } = useParams();
  const navigate = useNavigate();

  // ***************************************************************


  useEffect(() => {

    // Ensure signed in user only accesses their projects.
    if (authUser !== username) navigate(`/projects/created/by/${authUser}`);

    async function getUserProjects() {
      try {
        let userProjects = await API.getUserCreatedProjects(username);
        setProjects(userProjects);
      } catch (e) {
        setErrors(e);
        return;
      }
    };

    getUserProjects();

  }, [setProjects, setMatchedProjectIds, authUser]);


  // ***************************************************************

  const handleNavToEditProj = (id) => {
    navigate(`/edit/project/${id}`)
  };

  // ***************************************************************

  let handleDeleteProj = async (project_id) => {
    try {
      await API.deleteProject(project_id);
      let newIds = matchedProjectIds.filter(id => id !== project_id);

      // Update the projects the user is matched with.
      setMatchedProjectIds(newIds);

      // Cause re-render for user
      setProjects(projects.filter(p => p.id !== project_id));
      // alert("Deleted project!");
    } catch (e) {
      setErrors(e);
      return;
    };
  };


  // ***************************************************************

  let noProjects = (
    <div>
      <h1>No projects, yet!</h1>
      <Link to="/projects/new">Create a project</Link>
    </div>
  )

  // ***************************************************************


  return (
    <div>
      <h1>Projects Created</h1>

      {errors ? <AlertNotification messages={errors} /> : null}


      {projects && projects.length > 0 ?
        projects.map(({ id, owner_username, project_desc, timeframe, github_repo, name }) =>
          <UserCreatedProject
            key={id}
            id={id}
            owner_username={owner_username}
            name={name}
            project_desc={project_desc}
            timeframe={timeframe}
            github_repo={github_repo}
            handleDeleteProj={handleDeleteProj}
            handleNavToEditProj={handleNavToEditProj}
          />
        )
        : noProjects}

    </div>
  )
};

export default UserCreatedProjectList;