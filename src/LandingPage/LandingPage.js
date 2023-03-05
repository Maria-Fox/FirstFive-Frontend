import React from "react";
import { Card, CardText, CardTitle } from "reactstrap";
import "./LandingPage.css"


const LandingPage = () => {
  return (
    <Card id="LandingPage-Card" className="mb-3 mt-5 container">

      {/* className="fw-bold fs-1 text-center" */}
      <CardTitle id="title">FirstFive</CardTitle>

      <CardText>The quickest way to: </CardText>

      <ul className="fs-2 container">
        <li>Review and join ongoing group projects.
        </li>
        <li>
          Gain valuable collaboration experience.
        </li>
        <li>
          Build resume ready projects.
        </li>
      </ul>



    </Card>


  )
}

export default LandingPage;