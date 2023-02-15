import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./MatchedProject.css";
import UserContext from "../UserComponents/UserContext";
import { Card, CardTitle, CardText, Button } from "reactstrap";


const MatchedProject = ({ name, owner_username, project_desc
  , project_id, timeframe, github_repo, handleUnmatch }) => {

  // ***************************************************************


  const { authUser } = useContext(UserContext);

  // ***************************************************************

  const unMatchOption = (
    <Button outline color="danger" className="unmatchButton"
      onClick={() => handleUnmatch(authUser, project_id)}
    >Unmatch Project</Button>
  )


  // ***************************************************************

  return (
    <Card className="MatchedProject container">

      <CardTitle tag="h2">{name}</CardTitle>

      <small>Created by {owner_username}</small>

      <div>
        {authUser !== owner_username ?
          <div>
            <p>Want to jump onto the project right away?
              <Link to={`/messages/${authUser}/create/${owner_username}`} style={{ color: "aqua" }} > Message Project owner</Link>
            </p>
          </div>
          :
          null}
      </div>


      <p>
        {github_repo ?
          <a href={github_repo} target="_blank" rel="noreferrer" style={{ color: "aqua" }}> View Repo for: {name} </a>
          : null}
      </p>

      <CardText>Project Timeframe: {timeframe}</CardText>


      <div >
        <CardText>{project_desc}</CardText>
      </div>



      <div className="Match-Options">

        {/* Links to View Project user matches, and project members */}

        <Link to={`/matches/view/${project_id}/users`} style={{ color: "aqua", margin: "20px" }}> View Project User Matches</Link>

        <Link to={`/projectmembers/view/all/${project_id}`} style={{ color: "aqua" }}> View Project Members</Link>

        {/* Proejct owners cannot remove a match from projects they create*/}
        {authUser !== owner_username ? unMatchOption : null}

      </div>

    </Card>
  );
};

export default MatchedProject;