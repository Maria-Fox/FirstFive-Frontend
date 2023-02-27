import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertNotification from "../Common/AlertNotifications";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  Button,
} from "reactstrap";

const LoginForm = ({ authenticateuser }) => {

  // ***************************************************************

  let navigate = useNavigate();

  let initial_state = {
    "username": "",
    "password": ""
  };

  let [formData, setFormData] = useState(initial_state);
  let [formErrors, setFormErrors] = useState(null);

  // ***************************************************************


  let handleChange = (e) => {
    let { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }));
  };

  // ***************************************************************

  let handleSubmit = async (e) => {
      e.preventDefault();
      // This should be attaching the token & authUser before navigating elsewhere. The await is not completing
      let response = await authenticateuser(formData);
      if (response.success) {
        // This needs to happen before anything else.
        navigate(`/home`);
        console.log("Successful authentication *******")
        console.log("should happen after navigation")
      } else {
        setFormErrors(response.errors);
        return;
      };
  };

  // ***************************************************************


  return (
    <div className="container" >

      <h2 className="mb-3">Login</h2>
      <Card>

        {formErrors ? <AlertNotification messages={formErrors} /> : null}

        < CardBody >
          <Form className="LoginForm" >
            <FormGroup>
              <Label for="username" className="mt-3">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                onChange={handleChange}
              />

              <Label for="password" className="mt-3">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="on"
                onChange={handleChange}
              />
            </FormGroup>


            <Button type="submit" onClick={handleSubmit}>Submit</Button>
          </Form>
        </CardBody>
      </Card>
    </div >
  )
};

export default LoginForm;