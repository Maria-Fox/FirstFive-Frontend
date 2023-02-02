import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../API";
import CommonUserProfile from "../CommonUserProfile/CommonUserProfile";


const ProjectMemberList = () => {

  // ***************************************************************
  const [projMembers, setProjMembers] = useState(null);
  const { project_id } = useParams()

  useEffect(() => {

    async function viewProjMembers() {
      try {
        let response = await API.viewAllProjMembers(project_id)
        let returnArr = Object.values(response.proj_members)
        console.log(returnArr);
        setProjMembers(returnArr);
        // console.log(returnArr.map(user => [user.username, user.bio]))
      } catch (e) {
        console.log(e);
      };
    };

    viewProjMembers();
  }, [setProjMembers]);

  return (
    <div>
      <h1>Project Members</h1>
      {projMembers ? projMembers.map(user =>
        <CommonUserProfile
          key={user.username}
          username={user.username}
          bio={user.bio}
        />
      ) : "Loading..."}
    </div>
  )
}

export default ProjectMemberList;