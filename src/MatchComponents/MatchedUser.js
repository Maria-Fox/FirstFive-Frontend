import React, { useContext } from "react";
import UserContext from "../UserComponents/UserContext";
import "./MatchedUser.css"

const MatchedUser = ({ user_matched, matched_user_bio, project_owner, addUserToProjectMember, project_id, isUserProjectMember }) => {
  console.log("PLS WORK", project_owner, project_id)

  const { authUser } = useContext(UserContext);


  // ***************************************************************

  let buttonStyle = isUserProjectMember(user_matched) ? "ProjectMember" : "MatchedUser";

  // ***************************************************************



  return (
    <div key={user_matched} className="MatchedUser-Div">
      <h1>{user_matched}</h1>
      <p>{matched_user_bio}</p>

      {authUser === project_owner ?
        <button onClick={() => addUserToProjectMember(project_id, user_matched)}
          className={buttonStyle} >Add</button> : null}

    </div>
  );
};

export default MatchedUser;