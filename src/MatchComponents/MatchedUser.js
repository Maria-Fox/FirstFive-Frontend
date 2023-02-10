import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserComponents/UserContext";
import "./MatchedUser.css"

const MatchedUser = ({ user_matched, matched_user_bio, project_owner, addUserToProjectMember, project_id, isUserProjectMember }) => {
  console.log("PLS WORK", project_owner, project_id)

  const { authUser } = useContext(UserContext);


  // ***************************************************************

  let buttonStyle = isUserProjectMember(user_matched) ? "ProjectMember" : "MatchedUser";

  // ***************************************************************

  let msgButton = (
    <Link to={`/messages/${authUser}/create/${user_matched}`}>Message {user_matched}</Link>
  );

  // ***************************************************************


  return (
    <div key={user_matched} className="MatchedUser-Div">
      <h1>{user_matched}</h1>
      <p>{matched_user_bio}</p>

      {authUser === project_owner ?
        <button onClick={() => addUserToProjectMember(project_id, user_matched)}
          className={buttonStyle} >Add To Project Members</button> : null}

      {authUser !== user_matched ? msgButton : null}



    </div>
  );
};

export default MatchedUser;