import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import UserContext from "../UserComponents/UserContext";

const ProjectMember = ({ username, handleRemoveProjMember }) => {

  // console.log(project_owner)

  const { authUser } = useContext(UserContext);
  const { project_id } = useParams();


  let msgUserOption = (
    <button>
      <Link to={`/messages/${authUser}/create/${username}`}>Message {username}</Link>
    </button>
  );

  let removeProjectMemberOption = (
    <button onClick={() => handleRemoveProjMember(project_id, username)}>
      Remove
    </button>
  );



  return (
    <div style={{ border: "solid 2px whitesmoke" }}>
      <h1>{username}</h1>

      {username != authUser ? msgUserOption : null}

      {/* {project_owner === authUser ? removeProjectMemberOption : null} */}
    </div>
  )
}

export default ProjectMember;