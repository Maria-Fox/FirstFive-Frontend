import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import UserContext from "../UserComponents/UserContext";
import { Card, CardTitle, Button } from "reactstrap";

const ProjectMember = ({ username, handleRemoveProjMember }) => {

  // console.log(project_owner)

  const { authUser } = useContext(UserContext);
  const { project_id } = useParams();


  let msgUserOption = (
    <Button outline color="info">
      <Link to={`/messages/${authUser}/create/${username}`}>Message {username}</Link>
    </Button>
  );

  let removeProjectMemberOption = (
    <Button onClick={() => handleRemoveProjMember(project_id, username)}>
      Remove
    </Button>
  );



  return (
    <Card style={{ border: "solid 2px whitesmoke" }}>
      <CardTitle >{username}</CardTitle>

      {username !== authUser ? msgUserOption : null}

      {/* {project_owner === authUser ? removeProjectMemberOption : null} */}
    </Card>
  )
}

export default ProjectMember;