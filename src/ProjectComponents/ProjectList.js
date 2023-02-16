import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../API";
import UserContext from "../UserComponents/UserContext";
import ProjectCard from "./ProjectCard";
import confetti from 'https://cdn.skypack.dev/canvas-confetti';
import AlertNotification from "../Common/AlertNotifications";


const ProjectList = () => {

  // ***************************************************************


  let { authUser, matchedProjectIds, setMatchedProjectIds } = useContext(UserContext);

  let [projects, setProjects] = useState(null);
  const [errors, setErrors] = useState(null);

  // ***************************************************************

  useEffect(function viewAllProjects() {
    async function getAllProjects() {

      try {
        console.log("IN PROJECTS MATCHED IDS ARE", matchedProjectIds.length)
        if (matchedProjectIds.length === 0) {
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

  }, [matchedProjectIds, setMatchedProjectIds]);

  // ***************************************************************


  let handleMatch = async function (authUser, id) {
    try {
      console.log("matched ids BEFORE", matchedProjectIds);
      await API.addMatch(authUser, id);
      // Add in the new Proejct ID into state. ProjectList sends off a new request to get the ones not added.
      setMatchedProjectIds(matchedProjectIds => [...matchedProjectIds, id]);
      console.log("after matched id", matchedProjectIds)
      // alert("You've been matched!");
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
        projects ? projects.map(({ id, owner_username, name, project_desc, timeframe, github_repo }) =>
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