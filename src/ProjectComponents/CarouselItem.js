import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CarouselItem.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import { Card } from "reactstrap";


const CarouselItem = function ({ id, name, project_desc, timeframe, github_repo, handleMatch, skip }) {

  return (
    <Card className="CarouselItem-div">

      <h2>{name}</h2>


      <p>Project Timeframe: {timeframe}</p>

      {github_repo ?
        <Link to={github_repo} style={{ color: "aqua" }}
        >Github Repo</Link>
        : null}


      <p> {project_desc}</p>

      <div className="MatchOption">

        <button onClick={skip} className="SkipButton">
          X</button>

        <button onClick={handleMatch} className="MatchButton"
        ><FontAwesomeIcon icon={regular('heart')} /></button>


      </div>


    </Card >
  )
};



export default CarouselItem;