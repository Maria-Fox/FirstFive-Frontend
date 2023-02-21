import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardText } from "reactstrap";
import API from "../API";
import AlertNotification from "../Common/AlertNotifications";
import ProjectMember from "./ProjectMember";

const ProjectMemberList = () => {

  // ***************************************************************
  const [projMembers, setProjMembers] = useState(null);
  const [errors, setErrors] = useState(null);
  const { project_id } = useParams();

  useEffect(() => {

    async function viewProjMembers() {
      let response = await API.viewAllProjMembers(project_id);
      let allMembers = Object.values(response.proj_members)
      setProjMembers(allMembers);
    };

    viewProjMembers();
  }, [setProjMembers]);

  // ***************************************************************


  let handleRemoveProjMember = async function (project_id, username) {
    try {
      await API.deleteProjectMember(project_id, username);
      setProjMembers(projMembers.filter(users => users.username !== username));
      // alert("deleted user");
    } catch (e) {
      setErrors(e);
      return;
    };
  };

  // ***************************************************************

  let noProjMembers = (
    <Card>
      <CardText>No project members, yet!</CardText>
    </Card>
  )


  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Project Members</h1>

      <p style={{ textAlign: "center" }}>Want to jump on the project? Message a project member!</p>
      <small>Note: Only the project owner can officially add you to the list, but it's a good idea to get aquainted with the existing members.</small>

      {errors ? <AlertNotification messages={errors} /> : null}

      {projMembers && projMembers.length > 0 ? projMembers.map(user =>
        <ProjectMember
          key={user.username}
          username={user.username}
          bio={user.bio}
          handleRemoveProjMember={handleRemoveProjMember}
        />
      )
        : noProjMembers}

    </div>
  )
}

export default ProjectMemberList;