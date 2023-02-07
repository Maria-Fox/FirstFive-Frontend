import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import API from "../API";
import AlertNotification from "../Common/AlertNotifications";

const UpdateProfileForm = () => {

  const { authUser } = useContext(UserContext);
  const { username } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [formErrors, setFormErrors] = useState([]);

  // ***************************************************************

  useEffect(() => {
    async function confirmPermission() {
      if (authUser !== username) {
        // If not the appropriate user then redirect to that users page.
        navigate(`/users/update/:${authUser}`);
      };

      let userData = await API.viewAuthUserProfile(username);
      console.log(userData, "!!!!!!!!!!!from update profile")

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
    <div>
      <h1>Update Profile</h1>

      {formErrors ? <AlertNotification messages={formErrors} /> : null}

      {formData ?
        <form onSubmit={handleSubmit}>

          <p>cannot update username*****</p>

          <label htmlFor="username" >Username
            <input
              type="text"
              id="username"
              value={formData.username}
              name="username"
              required
              onChange={handleChange}
            >
            </input>
          </label>

          <label htmlFor="password" >Password
            <input
              type="password"
              id="password"
              value={formData.password}
              name="password"
              required
              onChange={handleChange}
            >
            </input>
          </label>

          <label htmlFor="Email" >Email
            <input
              type="email"
              id="email"
              value={formData.email}
              name="email"
              required
              onChange={handleChange}
            >
            </input>
          </label>

          <label htmlFor="bio" >Bio
            <input
              type="text"
              id="bio"
              value={formData.bio}
              name="bio"
              required
              onChange={handleChange}
            >
            </input>
          </label>

          <button>Update</button>

        </form>
        :
        <p>Loading....</p>}

    </div>
  )
};

export default UpdateProfileForm;
