import React, { useEffect, useState, useContext } from "react";
import UserContext from "../UserComponents/UserContext";
import API from "../API";
import { Link, useParams } from "react-router-dom";
import CommonUserProfile from "../Common/CommonUserProfile";


const MatchedProjectUsers = () => {
  // ***************************************************************

  // const { authUser } = useContext(UserContext);
  const { project_id } = useParams();
  const [projData, setProjData] = useState(null);
  const [matchedUsers, setmatchedUsers] = useState(null);
  const [projectMembers, setProjectMembers] = useState(null);
  const { authUser } = useContext(UserContext);

  useEffect(() => {
    async function viewAllMatchedUsers() {
      try {
        // Retrieve the users who matched the project
        let response = await API.viewProjectUserMatches(project_id);
        let { project_data, user_matches } = response;

        let vals = Object.values(user_matches);
        setmatchedUsers(vals);

        // Retrieve users who are also project members 
        let projMemberData = await API.viewAllProjMembers(project_id)
        let project_member_values = Object.values(projMemberData.proj_members);
        let allProjectMembers = project_member_values.map(user => user.username);
        setProjectMembers([...allProjectMembers]);

        // Set project data.
        setProjData(project_data);
      } catch (e) {
        console.log(e, "********");
      }
    };

    viewAllMatchedUsers();
  }, [setProjData, project_id, setmatchedUsers, setProjectMembers]);


  // ***************************************************************

  let addUserToProjectMember = async function (project_id, userToAdd) {
    try {
      let response = API.addProjectMember(project_id, userToAdd);
      console.log(response);
      alert("User added to project members");
    } catch (e) {
      console.log(e);
    };
  };


  return (
    <div>
      <h1>Matched Users for: </h1>
      {projData && matchedUsers ?
        <div>

          <h1>{projData.proj_name}</h1>
          <small>
            <Link to={`/users/${projData.proj_owner}`}>
              {projData.proj_owner}
            </Link>
          </small>


          <p>
            {projData.github_repo ?
              <a href={projData.github_repo} target="_blank" rel="noreferrer" style={{ color: "aqua" }}> View Repo </a>
              : null}
          </p>

          <p>{projData.proj_desc}</p>

          <div>
            <h2>Matched Users</h2>
            {matchedUsers.map(({ user_matched, matched_user_bio }) =>
              <CommonUserProfile
                key={user_matched}
                username={user_matched}
                bio={matched_user_bio}
              />
            )}
          </div>

        </div>

        : "loading.."}
    </div>
  )
};

export default MatchedProjectUsers;

