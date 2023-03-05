import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../API";
import UserContext from "../UserComponents/UserContext";
import AlertNotification from "../Common/AlertNotifications";
import { Form, FormGroup, Button, CardBody, Card, Label, Input, CardText } from "reactstrap"

const CreateProjectForm = () => {

  // ***************************************************************
  let navigate = useNavigate();
  let { authUser, matchedProjectIds, setMatchedProjectIds } = useContext(UserContext);

  let initial_state = {
    name: null,
    project_desc: null,
    timeframe: null,
    github_repo: ""
  };

  let [projData, setProjData] = useState(initial_state);
  let [errors, setErrors] = useState(null);

  // ***************************************************************

  let handleChange = (e) => {
    let { name, value } = e.target;
    setProjData(projData => ({
      ...projData,
      [name]: value
    }));
  };

  // ***************************************************************

  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(projData)
    try {
      let response = await API.createProject({ owner_username: authUser, ...projData });
      console.log("resp is:", response);
      // user is instantly matched with project. They can find it under the 'posts' Nav item.

      let id = response.id;
      // Newly created proj id goes into matches.
      setMatchedProjectIds([...matchedProjectIds, id]);

      // probably navigate elsewhere. temp for now
      // alert("Project was added successfully.");
      navigate(`/projects/created/by/${authUser}`);
    } catch (e) {
      setErrors(e);
      return;
    };
  };

  // ***************************************************************


  return (
    <>
      <h1 className="text-center text-white pt-2 mt-2">Create a Project</h1>

      <Card>
        {errors ? <AlertNotification messages={errors} /> : null}

        <CardText className="p-3">Important: You are automatically "matched" with any project you create. Then, as the project owner you may choose whether or not you want to be a project member. If you simply want to suggest a project to the community you can later transfer ownership to another interested user.  </CardText>

        <CardBody>
          <Form onSubmit={handleSubmit}>

            <FormGroup>
              <Label htmlFor="name" >Project Name
                <Input
                  type="text"
                  id="name"
                  value={projData.name}
                  name="name"
                  required
                  placeholder="Workout App"
                  onChange={handleChange}
                >
                </Input>
              </Label>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="project_desc" col>Project Description
                <Input
                  type="textarea"
                  id="project_desc"
                  value={projData.project_desc}
                  name="project_desc"
                  required
                  cols="35"
                  rows="8"
                  placeholder="Create a full-stack application where users can track their workouts!"
                  onChange={handleChange}
                >
                </Input>
              </Label>
            </FormGroup>


            <FormGroup>
              <Label htmlFor="timeframe" >Timeframe
                <Input
                  type="text"
                  id="timeframe"
                  value={projData.timeframe}
                  name="timeframe"
                  placeholder="3 weeks"
                  required
                  onChange={handleChange}
                >
                </Input>
              </Label>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="github_repo" >Github Repo
                <Input
                  type="text"
                  id="github_repo"
                  value={projData.github_repo}
                  name="github_repo"
                  placeholder="https://github.com/"
                  onChange={handleChange}
                >
                </Input>
              </Label>
            </FormGroup>

            <Button> Submit</Button>

          </Form>
        </CardBody>
      </Card>
    </>

  )
}

export default CreateProjectForm;