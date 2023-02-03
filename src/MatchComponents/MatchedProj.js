import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MatchedProject.css";
import UserContext from "../UserComponents/UserContext";


const MatchedProj = ({ name, owner_username, project_desc
  , project_id, timeframe, github_repo, handleUnmatch }) => {

  // ***************************************************************


  const { authUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleRequestToEdit = (project_id) => {
    navigate(`/edit/project/${project_id}`)
  };

  // ***************************************************************


  return (
    <div className="MatchedProject">
      <h1>{name}</h1>

      <small>Created by
        <Link to={`/users/${owner_username}`} style={{ color: "aqua" }}> {owner_username}</Link>
      </small>

      <p>
        {github_repo ?
          <a href={github_repo} target="_blank" rel="noreferrer" style={{ color: "aqua" }}> View Repo for: {name} </a>
          : null}
      </p>

      <p>Duration of project (estimated): {timeframe}</p>


      <div>
        <p>{project_desc}</p>
      </div>

      {/* Links to View Project user matches, and project members */}

      <Link to={`/matches/view/${project_id}/users`} style={{ color: "aqua", margin: "20px" }}> View Project User Matches</Link>

      <Link to={`/projectmembers/view/all/${project_id}`} style={{ color: "aqua" }}> View Project Members</Link>

      <button onClick={() => handleUnmatch(authUser, project_id)}>Unmatch Project</button>

      {/* Permit project owner to make edits */}
      {authUser === owner_username ? <button onClick={() => handleRequestToEdit(project_id)}>Edit Project</button> : null}

    </div>
  );
};

export default MatchedProj;