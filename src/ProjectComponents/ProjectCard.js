import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserComponents/UserContext";
import API from "../API";
import "./ProjectCard.css";

const ProjectCard = ({id, owner_username, name, project_desc, timeframe, github_repo, handleMatch}) => {

  // user can "match" a project, an alert shows, project is removed from display..
  let {authUser, matchedProjectIds, setMatchedProjectIds} = useContext(UserContext);
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


  return(
    <div className="ProjectCard">
      <h2>{name}</h2>
      <h3>Created by: {owner_username}</h3>

      <Link to={`/users/${owner_username}`} style= {{color:"aqua"}}>VIEW USER LINK</Link>


      <p>Expected project duration: {timeframe}</p>

      {github_repo ? 
      <a href= {github_repo} target = "_blank" style= {{color:"aqua"}}> View Repo for: {name} </a>
      : null}

      <p>{project_desc}</p>

      <button onClick = {() => handleMatch(authUser,id)}>Match</button>
    </div>
  )
};

export default ProjectCard;