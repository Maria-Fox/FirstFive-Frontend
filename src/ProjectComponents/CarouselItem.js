import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CarouselItem.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used


const CarouselItem = function ({ id, owner_username, name, project_desc, timeframe, github_repo, handleMatch, skip }) {

  return (
    <div className="CarouselItem-div">

      <h2>{name}</h2>


      <p>Expected project duration: {timeframe}</p>

      {github_repo ?
        <Link to={github_repo} style={{ color: "aqua" }}>Github Repo</Link>
        : null}

      < p > {project_desc}</p>


      <div className="MatchOption">

        <button onClick={skip} className="SkipButton">
          X</button>

        <button onClick={handleMatch} className="MatchButton"
        ><FontAwesomeIcon icon={regular('heart')} /></button>


      </div>


    </div >
  )
};



export default CarouselItem;