import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../API";
import ProjectMember from "./ProjectMember";

const ProjectMemberList = () => {

  // ***************************************************************
  const [projMembers, setProjMembers] = useState(null);
  const { project_id } = useParams();

  useEffect(() => {

    async function viewProjMembers() {
      try {
        let response = await API.viewAllProjMembers(project_id);
        let returnArr = Object.values(response.proj_members)
        setProjMembers(returnArr);

        let projectData = await API.viewProject(project_id);
      } catch (e) {
        console.log(e);
      };
    };

    viewProjMembers();
  }, [setProjMembers]);

  // ***************************************************************


  let handleRemoveProjMember = async function (project_id, username) {
    try {
      console.log(projMembers, "b4")
      console.log("USER TO DELETE", username, "!!!!!")
      let deletedUser = await API.deleteProjectMember(project_id, username);
      setProjMembers(projMembers.filter(users => users.username != username));
      console.log(projMembers, "After");
      alert("deleted user");

    } catch (e) {
      console.log(e);
    };
  };

  // ***************************************************************


  return (
    <div>
      <h1>Project Members</h1>
      {projMembers ? projMembers.map(user =>
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