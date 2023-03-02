import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Card, CardText, CardTitle } from "reactstrap";
import UserContext from "../UserComponents/UserContext";

const Home = () => {

  const { authUser } = useContext(UserContext);
  const navigate = useNavigate();

  const msgBody = (
    <Alert color="light">
      Hi, {authUser}!
    </Alert>
  );

  return (
    <div className="container">
      <Card className="mt-3">
        {authUser ? msgBody : null}
      </Card>

      <Card>
        <CardTitle>Need group project inspiration?</CardTitle>

        <CardText>
          add stuff here
        </CardText>

      </Card>


      <Card>
        <CardTitle>FAQ's</CardTitle>
      </Card>


    </div>
  )
}

export default Home;