import React from "react";
import { Link } from "react-router-dom";
import "./UserProject.css"
import { Button, Card, CardTitle, CardText } from "reactstrap";

const UserCreatedProject = ({ id, owner_username, name, project_desc, timeframe, github_repo, handleNavToEditProj, handleDeleteProj }) => {


  return (
    <Card className="container p-3 m-3">

      <CardTitle>{name}</CardTitle>
      <small>Created by: {owner_username}</small>
      <small>Timeframe: {timeframe}</small>

      {github_repo ? <Link to={github_repo}>Repo</Link> : null}

      <div>
        <p>{project_desc}</p>
      </div>

      <Button outline color="info" onClick={() => handleNavToEditProj(id)}>Edit Details</Button>
      <Button outline color="danger " onClick={() => handleDeleteProj(id)}>Delete</Button>

      <Link to={`/projectmembers/update/${id}`} style={{ "color": "aqua" }}>view/ Edit Project Members</Link>

    </Card >
  )

}

export default UserCreatedProject;