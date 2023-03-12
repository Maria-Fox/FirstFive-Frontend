import React, { useContext, flushSync } from "react";
import { Card, Alert, CardText } from "reactstrap";
import UserContext from "../UserComponents/UserContext";
import "./Home.css";

const Home = () => {

  const { authUser } = useContext(UserContext);


  return (
    <Card className="bg-light text-center" id="home-div">
      <Alert>Hi, {authUser}</Alert>

      <Card className="border-0">
        <CardText>Below are four general steps that can be applied to any project for best results. Once reviewed, move onto "Projects" to begin your journey!</CardText>
      </Card>
    </Card>

  )
}

export default Home;