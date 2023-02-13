import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertNotification from "../Common/AlertNotifications";
import "./RegisterForm.css";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  Button
} from "reactstrap";

const RegisterForm = ({ registerUser }) => {


  // ***************************************************************

  let initial_state = {
    username: "",
    password: "",
    email: "",
    bio: ""
  };

  let navigate = useNavigate();

  let [formData, setFormData] = useState(initial_state);
  let [errors, setErrors] = useState();

  // ***************************************************************

  let handleChange = (e) => {
    let { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }))
  };

  // ***************************************************************

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formData)
    let response = await registerUser(formData);
    console.log("resp is:", response);

    if (response.success) {
      console.log("success");
      navigate("/projects/view");
    } else {
      console.log([response.errors])
      setErrors([response.errors]);
      console.log(errors, "NEW ERRORS")
    };
  };

  // ***************************************************************


  return (
    <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
      <h2 className="mb-3">Register</h2>

      <Card>

        {errors ? <AlertNotification messages={errors} /> : null}


        <CardBody>
          <Form className="RegisterForm">
            <FormGroup>
              <Label for="username" className="mt-3">Username
                <Input
                  id="username"
                  name="username"
                  type="text"

                  onChange={handleChange} />
              </Label>

              <Label for="password" className="mt-3">Password
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="on"
                  onChange={handleChange}
                  className="RegisterInput" />
              </Label>

              <Label for="firstName" className="mt-3">Email
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  onChange={handleChange} />
              </Label>

              <Label for="lastName" className="mt-3">Bio
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  onChange={handleChange} />
              </Label>


            </FormGroup>


            <Button onClick={handleSubmit}>Submit</Button>
          </Form>
        </CardBody>
      </Card>
    </div >
  );
};

export default RegisterForm;