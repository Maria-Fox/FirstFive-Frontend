import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import UserContext from "../UserComponents/UserContext";

const ProjectMember = ({ username, handleRemoveProjMember }) => {

  const { authUser } = useContext(UserContext);
  const { project_id } = useParams();


  let msgUserOption = (
    <button>
      <Link to={`/messages/${authUser}/create`}>Message {username}</Link>
    </button>
  )
  return (
    <div>
      <h1>{username}</h1>

      {username == authUser ? null : msgUserOption}

      {/* Need to limit to just the project_owner. */}
      <button onClick={() => handleRemoveProjMember(project_id, username)}>Remove</button>

    </div>
  )
}

export default ProjectMember;