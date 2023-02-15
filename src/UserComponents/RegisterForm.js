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
    <div >
      <h2 style={{ textAlign: "center" }}>Register</h2>

      <Card>

        {errors ? <AlertNotification messages={errors} /> : null}


        <CardBody>
          <Form >
            <FormGroup  >
              <Label for="username" className="mt-3">Username
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Username"
                  onChange={handleChange} />
              </Label>
            </FormGroup>

            <FormGroup >
              <Label for="password" className="mt-3">Password
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="on"
                  placeholder="@ least 6 characters"
                  onChange={handleChange}
                  className="RegisterInput" />
              </Label>
            </FormGroup>

            <FormGroup >
              <Label for="email" className="mt-3">Email
                <Input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="email@aol.com"
                  onChange={handleChange} />
              </Label>
            </FormGroup>

            <FormGroup >
              <Label for="bio" className="mt-3">Bio
                <Input
                  id="bio"
                  name="bio"
                  type="text"
                  placeholder="CS student"
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