import React from "react";
import { Link } from "react-router-dom";


const MatchedProj = ({ name, owner_username, project_desc, project_id, timeframe }) => {
  console.log(name, owner_username, project_desc, project_id, timeframe, "*********")
  return (
    <div>
      <h1>{name}</h1>
      <small>Created by: {owner_username}</small>
      <p>Duration of project (estiamted): {timeframe}</p>


      <div>
        <p>{project_desc}</p>
      </div>


    </div>
  );
};

export default MatchedProj;