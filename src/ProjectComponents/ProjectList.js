import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import API from "../API";
import UserContext from "../UserComponents/UserContext";

const ProjectList = () => {

  let navigate = useNavigate();
  // authuser is still a piece of state. If the user changes redirect acoringly.
  let {authUser} = useContext(UserContext); 

  let [projects, setProjects ] = useState(null);

  useEffect(function viewAllProjects() {
    async function getAllProjects(){
      console.log("User in projList is", authUser);
      // console.log("IN PROJ LIST AUTH USER IS, ", authUser);
      // if(!authUser) navigate("/auth/register");

      try{
        // console.log(authUser);
        let response = await API.getAllProjects();
        setProjects(response);
      }catch(e){
        console.log(e);
      }
    }
    getAllProjects()
    
  }, [authUser]);

  return(
    <div>
      {projects ? projects.map(p => <p>{p.name}</p>) : null }
      
    </div>
  )
}

export default ProjectList;