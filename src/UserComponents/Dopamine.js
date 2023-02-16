import React from "react";
import confetti from 'https://cdn.skypack.dev/canvas-confetti';
// import './Dopamine.css';
import { Card, CardBody, CardText, CardTitle, Button, CardFooter } from "reactstrap";


const Dopamine = () => {
  return (
    <Card className="text-center d-print-flex align-items-md-center justify-content-md-center">
      <CardTitle className="h1 p-3 m-3">Need a pick-me-up?</CardTitle>

      <CardBody>
        <CardText>
          Click the button to release confetti! This activates a reward-system releasing domaine creating that "feel good" sensation.
        </CardText>

        <CardText>Want to learn more about dopamine and the reards system? Visit <a href="https://www.youtube.com/watch?v=f7E0mTJQ2KM" target="_blank">this two minute video</a>.</CardText>

      </CardBody>


      <Button outline color="info" className="align-items-md-center"
        onClick={() => confetti()} >Click</Button>

    </Card >
  )
}

export default Dopamine;