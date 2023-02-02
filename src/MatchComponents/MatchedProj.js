import React from "react";
import { Link } from "react-router-dom";
import "./MatchedProject.css";


const MatchedProj = ({ name, owner_username, project_desc
  , project_id, timeframe, github_repo }) => {
  console.log("Math data: ", project_id, "*********")
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

      <Link to={`/matches/view/${project_id}/users`} style={{ color: "aqua", margin: "20px" }}> View Project User Matches</Link>

      <Link to={`/projectmembers/view/all/${project_id}`} style={{ color: "aqua" }}> View Project Members</Link>


    </div>
  );
};

export default MatchedProj;