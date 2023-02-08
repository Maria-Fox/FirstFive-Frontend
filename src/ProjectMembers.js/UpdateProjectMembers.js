import React, { useState, useContext, useEffect } from "react";
import UserContext from "../UserComponents/UserContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import API from "../API";
import AlertNotification from "../Common/AlertNotifications";

const UpdateProjectMembers = () => {

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
      let deletedUser = await API.deleteProjectMember(project_id, username);
      let filteredOutDelted = projMembers.filter(users => users.username !== username);
      setProjMembers(...filteredOutDelted);
      alert("deleted user");
    } catch (e) {
      setErrors(e);
      return;
    };
  };

  return (
    <div>
      <h1>Project Members - Update</h1>

      {errors ? <AlertNotification messages={errors} /> : null}

      {projMembers && projMembers.length > 0 ? projMembers.map(({ username, bio }) =>
        <div key={username}>
          <h1>{username}</h1>
          <p>{bio}</p>

          <button onClick={() => handleRemoveProjMember(project_id, username)}>Remove</button>

        </div>
      ) :
        <div>
          <p>No project members, yet!

            <p>Looking to add project members?<p>
            </p>View the users who have matched with this project and click, "Add" when you find someone you're looking for!</p>
            <Link to={`/matches/view/${project_id}/users`}>View Project Members</Link>
          </p>
        </div>
      }
    </div>
  )
}

export default UpdateProjectMembers;