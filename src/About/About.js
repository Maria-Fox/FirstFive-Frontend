import React from "react";
import { Card, CardTitle, CardText } from "reactstrap";
import "./About.css";

const About = () => {
  return (
    <Card className="AboutDiv container">
      <CardTitle tag="h1" className="text-center">About FirstFive</CardTitle>

      <CardText>
        <h2>What is FirstFive?</h2>
        <p>FirstFive is a group project collaboration app with a "dating-app" aspect for added fun!</p>

        <p> Here, users can review and match projects. Once a user has matched a project they can see a list of all other users who matched the project or are active project members. From there, matched users can begin messaging one another and move forward with the project.</p>


        <h3>Why was FirstFive created?</h3>
        <p>FirstFive was created to support early career professionals in gaining valuable collaboration experience.</p>

        <h4>Why the name FirstFive?</h4>
        <p> The typical computer science degree takes 4-5 years. Bootcamps vary. However, a common theme among both graduates is the idea that they have few projects to demonstrate their skills, or they want to build additional projects to build their resume.
        </p>

        <p>FirstFive is intended for people with 0 - 5 years of experience in an indsutry. Instead of completing a degree or bootcamp with little or no projects. Here, users can slowly build up their resume while aquiring necessary collaboration skills.</p>

      </CardText>
    </Card>
  );
};

export default About;