import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import UserContext from "../UserComponents/UserContext";
import { Card, CardTitle, Button } from "reactstrap";

const ProjectMember = ({ username, handleRemoveProjMember }) => {

  // console.log(project_owner)

  const { authUser } = useContext(UserContext);
  const { project_id } = useParams();

  // ***************************************************************

  let msgUserOption = (
    <Button outline color="info"
      href={`/messages/${authUser}/create/${username}`}
    > Message {username}
    </Button >
  );

  // ***************************************************************

  let removeProjectMemberOption = (
    <Button onClick={() => handleRemoveProjMember(project_id, username)}>
      Remove
    </Button>
  );


  // ***************************************************************

  return (
    <Card className="container m-4 p-4">
      <CardTitle >{username}</CardTitle>

      {username !== authUser ? msgUserOption : null}

      {/* {project_owner === authUser ? removeProjectMemberOption : null} */}
    </Card>
  )
}

export default ProjectMember;