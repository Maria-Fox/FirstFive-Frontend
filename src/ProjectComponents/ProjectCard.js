import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserComponents/UserContext";
import "./ProjectCard.css";

const ProjectCard = ({ id, owner_username, name, project_desc, timeframe, github_repo, handleMatch }) => {

  // user can "match" a project, an alert shows, project is removed from display..
  let { authUser } = useContext(UserContext);
  console.log("In project card, the auth user is", authUser)

  // async function handleMatch(e) {
  //   try{
  //     console.log(authUser, id)
  //     let newMatch = await API.addMatch(authUser, id);
  //     // Add in the new Proejct ID into state. ProjectList sends off a new request to get the ones not added.
  //     console.log("matched b4:", matchedProjectIds)
  //     setMatchedProjectIds(matchedProjectIds => [...matchedProjectIds, id]);
  //     // some JS function for interactive/ fun match visual.
  //     alert("You've been matched!");
  //   }catch(e){
  //     console.log(e);
  //   };
  // };


  return (
    <div className="ProjectCard">
      <h2>{name}</h2>
      <Link to={`/projects/${id}`} style={{ color: "aqua" }}>View Alone</Link>
      <h3>Created by: {owner_username}</h3>

      <p>Expected project duration: {timeframe}</p>

      <p>{project_desc}</p>

      {authUser === owner_username ? <Link>Edit Prooject</Link> :
        <button onClick={() => handleMatch(authUser, id)}>Match</button>
      }

    </div>
  )
};

export default ProjectCard;