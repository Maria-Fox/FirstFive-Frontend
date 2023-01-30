import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import API from "../API";
import UserContext from "../UserComponents/UserContext";
import ProjectCard from "./ProjectCard";

const ProjectList = () => {

  let navigate = useNavigate();
  let {authUser, matchedProjectIds, setMatchedProjectIds} = useContext(UserContext); 

  let [projects, setProjects] = useState(null);

  useEffect(function viewAllProjects() {
    // if(authUser == undefined) return;
    async function getAllProjects(){
      console.log(matchedProjectIds);

      try{
        // console.log(authUser);
        let response = await API.getNonMatchedProjects();
        setProjects(response);
      }catch(e){
        console.log(e);
      }
    }
    getAllProjects()
    
  }, [matchedProjectIds]);


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
        />
      ) 
    : 
    <p>Loading...</p>}
      
    </div>
  )
}

export default ProjectList;