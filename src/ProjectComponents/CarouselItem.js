import React, { useState } from "react";

const CarouselItem = function ({ id, owner_username, name, project_desc, timeframe, github_repo, handleMatch, skip }) {

  const [isHover, setHover] = useState(false);

  const updateBackground = async function () {
    console.log("UPDATING BACKGROUND")
    setHover(true);
  }

  const hoverAddition = (
    <p style={{ color: "aqua" }} >Matching!</p>
  )

  // onMouseEnter={updateBackground}
  //         onMouseLeave={() => setHover(false)}

  return (
    <div style={{ border: "2px solid white", padding: "20px" }}>
      <h2>{name}</h2>

      <p>Expected project duration: {timeframe}</p>

      <p>{project_desc}</p>

      {isHover ? hoverAddition : null}


      <button onClick={skip}>Skip</button>

      <>
        <button onClick={handleMatch}
        >Match</button>
      </>


    </div>
  )
};



export default CarouselItem;