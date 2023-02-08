import React from "react";
import { Link } from "react-router-dom";
import "./UserProject.css"

const UserCreatedProject = ({ id, owner_username, name, project_desc, timeframe, github_repo, handleNavToEditProj, handleDeleteProj }) => {


  return (
    <div className="UserProject">

      <h1>tid: {id}</h1>
      <h1>{name}</h1>
      <p>Created by: {owner_username}</p>
      <p>Timeframe: {timeframe}</p>

      {github_repo ? <Link to={github_repo}>Repo</Link> : null}

      <div>
        <p>{project_desc}</p>
      </div>

      <button onClick={() => handleNavToEditProj(id)}>Edit</button>
      <button onClick={() => handleDeleteProj(id)}>Delete</button>

      <Link to={`/projectmembers/update/${id}`} style={{ "color": "aqua" }}>view/ Edit Project Members</Link>

    </div >
  )

}

export default UserCreatedProject;