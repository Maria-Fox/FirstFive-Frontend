import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserComponents/UserContext";
import "./ProjectCard.css";
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";


const ProjectCard = ({ id, owner_username, name, project_desc, timeframe, github_repo, handleMatch }) => {

  // ***************************************************************

  // user can "match" a project, an alert shows, project is removed from display..
  let { authUser } = useContext(UserContext);
  let navigate = useNavigate();

  // ***************************************************************


  const handleUpdateRequest = () => {
    navigate(`/edit/project/${id}`);
  };

  // className="ProjectCard"
  // ***************************************************************

  return (
    <div >
      <Card className="ProjectCard container col-md-6 offset-md-3 col-lg-4 offset-lg-4">

        <CardBody>

          <CardTitle className="ProjectName">{name}</CardTitle>
          <CardSubtitle>Expected project duration: {timeframe}</CardSubtitle>

          <CardBody style={{ padding: "20px" }}>
            {project_desc}
          </CardBody>

          {/* If the authUser is also the proejct owner - allow for updates. Otherwise, allow user to match project. */}
          {authUser === owner_username ? <button onClick={handleUpdateRequest}>Edit Project</button> :
            <button onClick={() => handleMatch(authUser, id)}>Match</button>
          }

        </CardBody>

      </Card>

    </div >
  )
};

export default ProjectCard;