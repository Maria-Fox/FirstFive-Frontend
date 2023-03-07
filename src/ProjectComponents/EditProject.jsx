import React, { useState, useContext, useEffect } from "react";
import UserContext from "../UserComponents/UserContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import API from "../API";
import AlertNotification from "../Common/AlertNotifications";
import { FormGroup, Form, Card, Label, Input, Button } from "reactstrap"

const EditProject = () => {

  // ***************************************************************


  const { project_id } = useParams();
  const { authUser } = useContext(UserContext);
  const navigate = useNavigate();

  // ***************************************************************


  let project_values = {
    "owner_username": authUser,
    "name": "",
    "project_desc": "",
    "timeframe": "",
    "github_repo": ""
  }

  const [projData, setProjData] = useState(project_values);
  const [errors, setErrors] = useState(null);


  // ***************************************************************


  useEffect(() => {
    async function preloadProjData() {
      try {
        let response = await API.viewProject(project_id);
        // console.log(response.github_repo, "RES IS ")
        setProjData(
          {
            "owner_username": authUser,
            "name": response.name,
            "project_desc": response.project_desc,
            "timeframe": response.timeframe,
            "github_repo": response.github_repo
          });

      } catch (e) {
        setErrors(e);
        return;
      }
    }

    preloadProjData();
  }, [setProjData, authUser, project_id]);

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
    try {
      e.preventDefault();
      await API.editProject(project_id, projData);
      navigate(`/projects/created/by/${authUser}`);
    } catch (e) {
      setErrors(e);
      return;
    };
  };


  // ***************************************************************

  return (
    <div>
      {!projData ? <p>Loading...</p> :
        <div>
          <h1 className="text-center text-white pt-2 mt-2">Update: {projData.name}</h1>

          <Card >
            {errors ? <AlertNotification messages={errors} /> : null}

            <Form onSubmit={handleSubmit} className="container col-md-12 offset-md-3 col-lg-4 offset-lg-4 m-3">

              <FormGroup>
                <Label htmlFor="name" >Project Name
                  <Input
                    type="text"
                    id="name"
                    value={projData.name}
                    name="name"
                    required
                    onChange={handleChange}
                  >
                  </Input>
                </Label>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="project_desc" >Project Description
                  <Input
                    type="textarea"
                    id="project_desc"
                    value={projData.project_desc}
                    name="project_desc"
                    required
                    cols="35"
                    rows="8"
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
                    onChange={handleChange}
                  >
                  </Input>
                </Label>
              </FormGroup>

              <Button type="submit">Submit</Button>

            </Form>
          </Card>
        </div>
      }
    </div>
  )
};

export default EditProject;