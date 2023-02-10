import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../UserComponents/UserContext';
import confetti from 'https://cdn.skypack.dev/canvas-confetti';
import API from '../API';
import CarouselItem from "./CarouselItem";
import AlertNotification from '../Common/AlertNotifications';


function ProjectCarousel(args) {

  // **************************************************************

  const [projects, setProjects] = useState(null);
  const { authUser, matchedProjectIds, setMatchedProjectIds } = useContext(UserContext);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    async function initiateCarousel() {
      try {
        let response = await API.carouselProjects();
        console.log(response, "RES WAS")
        setProjects(response);
      } catch (e) {
        setErrors(e);
      }
    };

    initiateCarousel();
  }, [setProjects, setMatchedProjectIds]);


  // ***************************************************************

  let handleMatch = async function (authuser, id) {
    try {
      console.log(`Matching this ID : ${id}`)
      console.log("matched ids BEFORE", matchedProjectIds);
      await API.addMatch(authUser, id);
      setMatchedProjectIds(matchedProjectIds => [...matchedProjectIds, id]);
      console.log("after matched id", matchedProjectIds)
      // alert("You've been matched!");
      confetti();
      let newProjToDisplay = await API.carouselProjects();
      setProjects(newProjToDisplay);
    } catch (e) {
      setErrors(e);
      return;
    };
  };

  // **************************************************************


  // User chooses not to match the project. Gets new random project.
  let skip = async function () {
    let newRandomProj = await API.carouselProjects();
    setProjects(newRandomProj);
  };


  return (
    <div>
      <h1>Projects</h1>
      <p>Swipe right to match a project, left to skip!</p>

      {errors ? <AlertNotification messages={errors} /> : null}

      {!projects ? <p>Loading...</p> :
        <div>
          {projects.map(({ id, owner_username, name, project_desc, tiemframe, github_repo }) =>
            <CarouselItem
              key={id}
              id={id}
              owner_username={owner_username}
              name={name}
              project_desc={project_desc}
              tiemframe={tiemframe}
              github_repo={github_repo}
              handleMatch={() => handleMatch(authUser, id)}
              skip={skip}
            />)}

        </div>}
    </div>
  )
}

export default ProjectCarousel;