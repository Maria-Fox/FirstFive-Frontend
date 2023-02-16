import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../API";
import AlertNotification from "../Common/AlertNotifications";
import { Card, CardBody, CardTitle, Button } from "reactstrap";

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
      <h1 className="text-center">Project Members - Update</h1>

      <Card className="m-2">
        <CardBody >Looking to add members? To ensure only matched members are added please visit the <Link to={`/matches/view/${project_id}/users`}>users matched</Link> and click "add" under the prefered user.
        </CardBody>
      </Card>

      {errors ? <AlertNotification messages={errors} /> : null}


      {projMembers && projMembers.length > 0 ? projMembers.map(({ username, bio }) =>
        <Card key={username}
          className="container p -3 m-3 d-flex justify-content-center">

          <CardTitle className="h2">{username}</CardTitle>


          <CardBody>User bio: {bio}</CardBody>

          <Button outline color="danger" onClick={() => handleRemoveProjMember(project_id, username)}>Remove</Button>

        </Card>
      ) :
        <Card className="container m-3 p-3 d-flex justify-content-center">
          <CardTitle className="h2">No project members, yet!</CardTitle>

          <CardBody>Looking to add project members?
            Use the above link to see matched users.</CardBody>
        </Card>
      }
    </div >
  )
}

export default UpdateProjectMembers;