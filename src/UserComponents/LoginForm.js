import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertNotification from "../Common/AlertNotifications";

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
    try {
      e.preventDefault();
      let response = await authenticateuser(formData);
      if (response.success) {
        navigate(`/projects/view`);
      };
    } catch (err) {
      console.log([err]);
      setFormErrors([err]);
    }
  };

  // ***************************************************************


  return (
    <div>
      <h1>Sign in</h1>

      {formErrors ? <AlertNotification type="danger" messages={formErrors} /> : null};

      <form onSubmit={handleSubmit}>

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


        <button>Login</button>
      </form>
    </div>
  )
};

export default LoginForm;