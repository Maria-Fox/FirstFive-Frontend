import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserComponents/UserContext";
import "./MatchedUser.css"
import { Card, Button } from "reactstrap";

const MatchedUser = ({ user_matched, matched_user_bio, project_owner, addUserToProjectMember, project_id, isUserProjectMember }) => {

  const { authUser } = useContext(UserContext);


  // ***************************************************************

  let buttonStyle = isUserProjectMember(user_matched) ? "ProjectMember" : "MatchedUser";

  // ***************************************************************

  let msgButton = (
    <Link to={`/messages/${authUser}/create/${user_matched}`}
      className="msgButton"
    >Message {user_matched}</Link>
  );

  // ***************************************************************


  return (
    <Card key={user_matched} className="MatchedUser-Div container">
      <h1>{user_matched}</h1>
      <p>{matched_user_bio}</p>

      {authUser === project_owner ?
        <Button onClick={() => addUserToProjectMember(project_id, user_matched)}
          className={buttonStyle} >Add To Project Members</Button> : null}

      {authUser !== user_matched ? msgButton : null}

    </Card>
  );
};

export default MatchedUser;