import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../API";
import UserContext from "../UserComponents/UserContext";
import ProjectCard from "./ProjectCard";
import confetti from "canvas-confetti";
import AlertNotification from "../Common/AlertNotifications";
import { Card, CardText } from "reactstrap";


const ProjectList = () => {

  // ***************************************************************


  let {authUser, matchedProjectIds, setMatchedProjectIds } = useContext(UserContext);
  console.log( " auth user is in projectList ", authUser, "&&&&&")

  let [projects, setProjects] = useState(null);
  const [errors, setErrors] = useState(null);

  // ***************************************************************

  useEffect(function viewAllProjects() {
    async function getAllProjects() {
      console.debug(`#### In ProjectList matchedProjectIds are: ${matchedProjectIds}`)

      try {
        console.log("CHECK HERE AUTHUSER", authUser)
        // let userMatches = await API.viewUsernameMatches(authUser);
        // let matchIds = userMatches.map(match => match.project_id);
        // setMatchedProjectIds([...matchIds]);

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

  //  I get the following url when a user does a hard refresh: http://localhost:3001/matches/view/null/all _ THIS IS DUE TO THE INITIAL MOUNT.

  // During the re-render the APP catches the updatedUser. But displays an unauth error. NEED TO ADDRESS.
  }, [setMatchedProjectIds, setProjects, authUser]);

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

  const noProjectsToMatch = (
    <div className="container text-center">
      <h2>No projects to match, yet!</h2>
    </div>
  );

  // ***************************************************************

  return (
    <div className="container">
      <h1 className="text-center">Projects</h1>

      {errors ? <AlertNotification messages={errors} /> : null}

      <Card className="container m-3 p-3 text-center">
        <CardText>Prefer to view the projects through match-cards?
          <Link to="/projects/carousel" style={{ color: "aqua" }} >Click here!</Link>
        </CardText>

        <CardText className="text-center">Don't see anything you are interested in?
          <Link to="/projects/new" style={{ color: "aqua" }}>Create a project!</Link>
        </CardText>
      </Card>

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
          noProjectsToMatch
      }
    </div >
  );
};

export default ProjectList;