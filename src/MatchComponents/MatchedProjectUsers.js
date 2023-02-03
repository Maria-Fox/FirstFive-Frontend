import React, { useEffect, useState } from "react";
import API from "../API";
import { Link, useParams } from "react-router-dom";
import UserProfile from "../UserComponents/UserProfile";
import CommonUserProfile from "../CommonUserProfile/CommonUserProfile";


const MatchedProjectUsers = () => {
  // ***************************************************************

  // const { authUser } = useContext(UserContext);
  const { project_id } = useParams();
  const [projData, setProjData] = useState(null);
  const [matchedUsers, setmatchedUsers] = useState(null);

  useEffect(() => {
    async function viewAllMatchedUsers() {
      try {
        let response = await API.viewProjectUserMatches(project_id);
        let { project_data, user_matches } = response;
        console.log("original:", user_matches);

        let vals = Object.values(user_matches);
        // let userData = vals.map(user => [user.user_matched, user.matched_user_bio]);
        // console.log(userData);

        setmatchedUsers(vals);

        setProjData(project_data);
        console.log(matchedUsers)

        // console.log("Proj data:", projData);

      } catch (e) {
        console.log(e, "********");
      }
    };

    viewAllMatchedUsers();
  }, [setProjData, project_id, setmatchedUsers]);


  // ***************************************************************



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

