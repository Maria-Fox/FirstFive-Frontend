import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../API";
import UserContext from "../UserComponents/UserContext";
import ProjectCard from "./ProjectCard";
import confetti from "canvas-confetti";
import AlertNotification from "../Common/AlertNotifications";


const ProjectList = () => {

  // ***************************************************************


  let {authUser, matchedProjectIds, setMatchedProjectIds } = useContext(UserContext);
  console.log( " auth user is in projectList ", authUser, "&&&&&")

  let [projects, setProjects] = useState(null);
  const [errors, setErrors] = useState(null);

  // ***************************************************************

  useEffect(function viewAllProjects() {
    async function getAllProjects() {

      try {
        let userMatches = await API.viewUsernameMatches(authUser);
        let matchIds = userMatches.map(match => match.project_id);
        setMatchedProjectIds([...matchIds]);

        if (matchIds.length === 0) {
          console.log("USER DOES NOT HAVE MATCHES")
          let response = await API.getAllProjects();
          setProjects(response);
        } else {
          let response = await API.getNonMatchedProjects();
          setProjects(response);
        }
      } catch (e) {
        setErrors(e);
        return;
      };
    };

    getAllProjects();

    // if I add the authuser into dep. arr the refrload renders but gives unauth error.
  }, [setMatchedProjectIds, setProjects]);

  // ***************************************************************


  let handleMatch = async function (authUser, id) {
    try {
      console.log("matched ids BEFORE", matchedProjectIds);
      await API.addMatch(authUser, id);

      // Add the project to matches.
      setMatchedProjectIds(matchedProjectIds => [...matchedProjectIds, id]);

      // Update displayed unmatched projects, removing the latest match.
      setProjects(projects.filter(projects => projects.id !== id));
      confetti();
    } catch (e) {
      setErrors(e);
      return;
    };
  };

  // ***************************************************************

  return (
    <div className="container">
      <h1 className="text-center">Projects</h1>

      {errors ? <AlertNotification messages={errors} /> : null}

      <div className="text-center">
        <p>Prefer to view the projects through match-cards?
          <Link to="/projects/carousel" style={{ color: "aqua" }} >Click here!</Link>
        </p>
      </div>

      <div >
        <p className="text-center">Don't see anything you are interested in?
          <Link to="/projects/new" style={{ color: "aqua" }}>Create a project!</Link>
        </p>
      </div>

      {
        projects && projects.length > 0 ? projects.map(({ id, owner_username, name, project_desc, timeframe, github_repo }) =>
          <ProjectCard
            key={id}
            id={id}
            owner_username={owner_username}
            name={name}
            project_desc={project_desc}
            timeframe={timeframe}
            github_repo={github_repo}
            handleMatch={handleMatch}
          />
        )
          :
          <p>Loading...</p>
      }
    </div >
  );
};

export default ProjectList;