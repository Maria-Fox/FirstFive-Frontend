import React, { useContext } from "react";
import UserContext from "../UserComponents/UserContext";
// import "./ProjectCard.css";
import { Card, CardBody, CardSubtitle, CardTitle, Button, CardLink } from "reactstrap";


const ProjectCard = ({ id, name, project_desc, timeframe, github_repo, handleMatch }) => {

  // ***************************************************************

  // user can "match" a project, an alert shows, project is removed from display..
  let { authUser } = useContext(UserContext);

  // ***************************************************************

  return (
    <div >
      <Card className="container m-3 p-3">

        <CardBody>

          <CardTitle className="ProjectName">{name}</CardTitle>
          <CardSubtitle>Project timeframe: {timeframe}</CardSubtitle>

          <CardBody className="p-3">
            {project_desc}
          </CardBody>

          {github_repo ?  
          <CardLink href= {github_repo}>Github Repo</CardLink> 
          : <p>No github repo added.</p>}

          {/* If the authUser is also the project owner - allow for updates. Otherwise, allow user to match project. */}
          {/* style={{ display: "flex", justifyContent: "center" }} */}
          <div style={{ display: "flex", justifyContent: "center" }}>


            <Button onClick={() => handleMatch(authUser, id)}
              color="info">
              Match
            </Button>


          </div>

        </CardBody>

      </Card>

    </div >
  )
};

export default ProjectCard;