import React, { useContext } from "react";
import { Card, Alert, CardText } from "reactstrap";
import UserContext from "../UserComponents/UserContext";
import "./Home.css";

const Home = () => {

  const { authUser } = useContext(UserContext);


  return (
    <div>
      <Card className="bg-light text-center  container" id="home-div">
        <Alert>Hi, {authUser}</Alert>
        <Card className="border-0">
        </Card>
      </Card>
      {/* <p>Below are four general steps that can be applied to any project for best results. Once reviewed, move onto "Projects" to begin your journey!</p> */}
    </div>

  )
}

export default Home;