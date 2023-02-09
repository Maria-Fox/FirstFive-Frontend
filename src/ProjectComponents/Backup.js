import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../UserComponents/UserContext';
import confetti from 'https://cdn.skypack.dev/canvas-confetti';
import API from '../API';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap';


function ProjectCarousel(args) {

  // **************************************************************

  const [projects, setProjects] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const { authUser, matchedProjectIds, setMatchedProjectIds } = useContext(UserContext)

  useEffect(() => {
    async function initiateCarousel() {
      try {
        let response = await API.carouselProjects();
        console.log(response, "RES WAS")
        setProjects(response);
      } catch (e) {
        console.log(e);
      }
    };

    initiateCarousel();
  }, [setProjects, setMatchedProjectIds])

  // **************************************************************



  let handleMatch = async function (authuser, id) {
    try {
      console.log(`Matching this ID : ${id}`)
      console.log("matched ids BEFORE", matchedProjectIds);
      await API.addMatch(authUser, id);
      setMatchedProjectIds(matchedProjectIds => [...matchedProjectIds, id]);
      console.log("after matched id", matchedProjectIds)
      // alert("You've been matched!");
      confetti();
    } catch (e) {
      console.log(e);
    };
  };


  const next = () => {
    if (animating) return;
    // const nextIndex = activeIndex === projects.length - 1 ? 0 : activeIndex + 1;
    // setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? projects.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  // Proabbly won't keep
  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = !projects ? null : projects.map((proj) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={proj.id}
      >
        {/* <img src={item.src} alt={item.altText} /> */}
        <CarouselCaption
          captionHeader={proj.name}
          captionText={proj.project_desc}


        />
      </CarouselItem>
    );
  });

  return (
    <div>
      <h1>Projects</h1>
      <p>Swipe right to match a project, left to skip!</p>

      {!projects ? <p>Loading...</p> :
        <div>
          <Carousel
            activeIndex={activeIndex}
            match={() => handleMatch(authUser, projects.id)}
            previous={previous}
            {...args}
            style={{ border: "2px solid white", padding: "20px" }}
          >
            <CarouselIndicators
              items={projects}
              activeIndex={activeIndex}
              onClickHandler={goToIndex}
            />

            {slides}


            <CarouselControl
              direction="prev"
              directionText="Skip"
              onClickHandler={previous}
            />
            <CarouselControl
              direction="next"
              directionText="Match"
              onClickHandler={() => handleMatch(authUser, projects.id)}
            />
          </Carousel>
        </div>}
    </div>
  )
}

export default ProjectCarousel;