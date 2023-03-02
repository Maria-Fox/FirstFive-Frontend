import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserComponents/UserContext";
import { Card, CardTitle, CardText, Button, CardLink } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro'; // <-- import styles to be used
import "./MatchedProject.css";



const MatchedProject = ({ name, owner_username, project_desc
  , project_id, timeframe, github_repo, handleUnmatch }) => {

  // ***************************************************************


  const { authUser } = useContext(UserContext);

  // ***************************************************************

  const unMatchOption = (
    <Button outline color="danger" className="m-3"
      onClick={() => handleUnmatch(authUser, project_id)}
    >Unmatch Project</Button>
  )


  // ***************************************************************

  return (
    <Card className="container m-3 p-3">

      <CardTitle  className="fw-bold fs-2">{name}</CardTitle>
      {/* <small>Created by {owner_username}</small> */}

      <div>
      <small >Created by {owner_username}</small>
        {authUser !== owner_username ?
          <>
            {/* <p>Want to jump onto the project right away? */}
              <Link className=""
              to={`/messages/${authUser}/create/${owner_username}`} style={{ color: "MediumVioletRed", textDecoration: "none" }} > <FontAwesomeIcon icon={regular('message')} /> Msg Creator</Link>
            {/* </p>  */}
          </>
          :
          null}
      </div>

      <CardText >Project Timeframe: {timeframe}</CardText>


      {github_repo ?
          <CardLink className="pt-0 mt-0"
          href={github_repo} target="_blank" rel="noreferrer" style={{ color: "purple", textDecoration: "none" }}> View Repository</CardLink>
          : null}


      <div >
        <CardText>{project_desc}</CardText>
      </div>


{/* id = "Project-Options-Div" */}
      <div className="p-3 m-2" >

        {/* Links to View Project user matches, and project members */}

        <Link to={`/matches/view/${project_id}/users`} 
        className = "justify-content-between p-2 m-2 Link-Option"
        > Project User Matches</Link>

        <Link to={`/projectmembers/view/all/${project_id}`} 
        className= "justify-content-between p-2 m-2 Link-Option"> Project Members</Link>

        {/* Proejct owners cannot remove a match from projects they create*/}
        {authUser !== owner_username ? unMatchOption : null}

      </div>

    </Card>
  );
};

export default MatchedProject;