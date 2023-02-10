import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
      console.log(projMembers, "b4")
      console.log("USER TO DELETE", username, "!!!!!")
      await API.deleteProjectMember(project_id, username);
      setProjMembers(projMembers.filter(users => users.username !== username));
      console.log(projMembers, "After");
      alert("deleted user");

    } catch (e) {
      setErrors(e);
      return;
    };
  };

  // ***************************************************************


  return (
    <div>
      <h1>Project Members</h1>

      {errors ? <AlertNotification messages={errors} /> : null}

      {projMembers && projMembers.length > 0 ? projMembers.map(user =>
        <ProjectMember
          key={user.username}
          username={user.username}
          bio={user.bio}
          handleRemoveProjMember={handleRemoveProjMember}
        />
      )
        : <p>No project members, yet!</p>}

    </div>
  )
}

export default ProjectMemberList;