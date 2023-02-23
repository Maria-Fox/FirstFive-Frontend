import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../UserComponents/UserContext';
import confetti from 'canvas-confetti';
import API from '../API';
import CarouselItem from "./CarouselItem";
import AlertNotification from '../Common/AlertNotifications';
import { Card, CardTitle } from 'reactstrap';


function ProjectCarousel() {

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
      // console.log(`Matching this ID : ${id}`)
      // console.log("matched ids BEFORE", matchedProjectIds);
      await API.addMatch(authUser, id);
      setMatchedProjectIds(matchedProjectIds => [...matchedProjectIds, id]);
      confetti({ spread: 160, particleCount: 250 });
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

  // **************************************************************

  const noProjectsToDisplay = (
    <Card className='container'>
      <CardTitle> All existing projects have been matched!</CardTitle>
    </Card>
  );


    // **************************************************************



  return (
    <div className="text-center">

      <h1 >Projects</h1>

      <Card className='container m-3 p-3'>
        <p>Use "X" to skip a project and the heart to match!</p>
        <small>Note: The projects displayed are all random projects you have not matched with. There is a small possibility you get two of the same projects back to back. If this happens, just "skip" again and you'll see a new project!</small>
      </Card>

      {errors ? <AlertNotification messages={errors} /> : null}

      {!projects ? noProjectsToDisplay :
        <div>
          {projects.map(({ id, name, project_desc, timeframe, github_repo }) =>
            <CarouselItem
              key={id}
              id={id}
              name={name}
              project_desc={project_desc}
              timeframe={timeframe}
              github_repo={github_repo}
              handleMatch={() => handleMatch(authUser, id)}
              skip={skip}
            />)}

        </div>}
    </div>
  )
}

export default ProjectCarousel;