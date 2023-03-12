import React from "react";
import { Card, CardText, CardTitle } from "reactstrap";
import "./LandingPage.css"


const LandingPage = () => {
  return (
    <Card id="LandingPage-Card" className="mb-3 mt-5 container">
      <div id="backgroundimg-div" className="container" >

        <div className="container" id="list">
          <CardTitle id="title">FirstFive</CardTitle>
          <CardText className="">The quickest way to: </CardText>


          <ul  >
            <li>Review and join group projects.
            </li>
            <li>
              Gain collaboration experience.
            </li>
            <li>
              Build resume ready projects.
            </li>
          </ul>
        </div>
      </div>

      {/* </div>

      <div className="container" id="list"> */}
      {/* <CardTitle id="title">FirstFive</CardTitle>
        <CardText className="">The quickest way to: </CardText>

        <ul  >
          <li>Review and join group projects.
          </li>
          <li>
            Gain collaboration experience.
          </li>
          <li>
            Build resume ready projects.
          </li>
        </ul>


      </div> */}
    </Card >
  )
}

export default LandingPage;