import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import API from "../API";
import UserContext from "../UserComponents/UserContext";
import ProjectCard from "./ProjectCard";

const ProjectList = () => {

  let navigate = useNavigate();
  let {authUser, matchedProjectIds, setMatchedProjectIds} = useContext(UserContext); 
  console.log("********************", matchedProjectIds);

  let [projects, setProjects] = useState(null);

  useEffect(function viewAllProjects() {
    // console.log(authUser);
    // if(authUser == undefined) return;
    async function getAllProjects(){

      try{
        if(matchedProjectIds === null){
          let response = await API.getAllProjects();
          setMatchedProjectIds(response);
        } else {
          let response = await API.getNonMatchedProjects();
          setProjects(response);
        }
      }catch(e){
        console.log(e);
      };
    };

    getAllProjects();
    
  }, [matchedProjectIds]);

  let handleMatch = async function(authuser, id) {
    try{
      console.log("matched ids are", matchedProjectIds);
      let newMatch = await API.addMatch(authUser, id);
      // Add in the new Proejct ID into state. ProjectList sends off a new request to get the ones not added.
      console.log("matched b4:", matchedProjectIds)
      setMatchedProjectIds(matchedProjectIds => [...matchedProjectIds, id]);
      // some JS function for interactive/ fun match visual.
      alert("You've been matched!");
    }catch(e){
      console.log(e);
    };
  };


  return(
    <div>
      { projects ? projects.map(({id, owner_username, name, project_desc, timeframe, github_repo}) =>
      <ProjectCard 
        id = {id}
        owner_username = {owner_username}
        name = {name}
        project_desc = {project_desc}
        timeframe = {timeframe}
        github_repo = {github_repo}
        handleMatch = {handleMatch}
        />
      ) 
    : 
    <p>Loading...</p>}
      
    </div>
  )
}

export default ProjectList;