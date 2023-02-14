import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import API from "../API";
import AlertNotification from "../Common/AlertNotifications";
import "./UserProfile.css";
import { Card, Form, FormGroup, Label, Input, Button } from "reactstrap";

const UpdateProfileForm = () => {

  const { authUser } = useContext(UserContext);
  const { username } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [formErrors, setFormErrors] = useState(null);

  // ***************************************************************

  useEffect(() => {
    async function confirmPermission() {
      if (authUser !== username) {
        // If not the appropriate user then redirect to that users page.
        navigate(`/users/update/:${authUser}`);
      };

      let userData = await API.viewAuthUserProfile(username);

      setFormData({
        username: userData.username,
        password: "",
        email: userData.email,
        bio: userData.bio
      })


    };
    confirmPermission();
  }, [setFormData]);

  // ***************************************************************

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let response = await API.editUser(authUser, formData);
      console.log(response);
      navigate(`/users/${authUser}`);
    } catch (err) {
      setFormErrors(err);
      return;
    }
  }

  // ***************************************************************

  let handleChange = (e) => {
    let { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }))
  };

  // ***************************************************************

  return (
    <Card>
      {formErrors ? <AlertNotification messages={formErrors} /> : null}

      <h1 classname="PageTitle">Update Profile</h1>


      <div >
        {formData ?
          <Form onSubmit={handleSubmit}>

            <FormGroup>
              <Label htmlFor="username" >Username
                <Input
                  type="text"
                  id="username"
                  value={formData.username}
                  name="username"
                  required
                  onChange={handleChange}
                >
                </Input>
              </Label>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password" >Password
                <Input
                  type="password"
                  id="password"
                  value={formData.password}
                  name="password"
                  required
                  onChange={handleChange}
                >
                </Input>
              </Label>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="Email" >Email
                <Input
                  type="email"
                  id="email"
                  value={formData.email}
                  name="email"
                  required
                  onChange={handleChange}
                >
                </Input>
              </Label>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="bio" >Bio
                <Input
                  type="text"
                  id="bio"
                  value={formData.bio}
                  name="bio"
                  required
                  onChange={handleChange}
                >
                </Input>
              </Label>
            </FormGroup>

            <Button type="submit">Update</Button>

          </Form>
          :
          <p>Loading....</p>}

      </div>
    </Card>
  )
};

export default UpdateProfileForm;
