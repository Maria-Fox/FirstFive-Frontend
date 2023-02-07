import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../UserComponents/UserContext";
import "./ProjectCard.css";

const ProjectCard = ({ id, owner_username, name, project_desc, timeframe, github_repo, handleMatch }) => {

  // ***************************************************************

  // user can "match" a project, an alert shows, project is removed from display..
  let { authUser } = useContext(UserContext);
  let navigate = useNavigate();

  // ***************************************************************


  const handleUpdateRequest = () => {
    navigate(`/edit/project/${id}`);
  };


  // ***************************************************************

  return (
    <div className="ProjectCard">

      <h2>{name}</h2>

      <p>Expected project duration: {timeframe}</p>

      <p>{project_desc}</p>

      {/* If the authUser is also the proejct owner - allow for updates. Otherwise, allow user to match project. */}
      {authUser === owner_username ? <button onClick={handleUpdateRequest}>Edit Project</button> :
        <button onClick={() => handleMatch(authUser, id)}>Match</button>
      }

    </div>
  )
};

export default ProjectCard;