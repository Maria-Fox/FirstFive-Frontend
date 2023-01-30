import React, {useEffect, useState, useContext} from "react";
import UserContext from "./UserContext";
import { useNavigate } from "react-router-dom";
import API from "../API";

const Login = ({authenticateuser}) => {

  let {authUser, setAuthUser} = useContext(UserContext);
  let navigate = useNavigate();

  let initial_state = {
    "username": "",
    "password": ""
  };

  let [formData, setFormData] = useState(initial_state);
  let [formErrors, setFormErrors] = useState(null);

  let handleChange = (e) => {
    let {name, value} = e.target;
    setFormData(formData => ({
      ...formData,
      [name]:value
    }));
  };

  let handleSubmit = async (e) => {
    try{
      e.preventDefault();
      let response = await authenticateuser(formData);
      if(response.success){
        navigate("/projects/view");
      };
    } catch(err){
      console.log(err);
    }
  };

  let printErrors = () => {
    let errorsToPrint = formErrors.e[0];
    return(
      <h2>{errorsToPrint}</h2>
    );
  };

  return(
      <div>
        <h1>Sign in</h1>

        {formErrors ? <h1>{printErrors}</h1>: null};

        <form onSubmit = {handleSubmit}>

        <label htmlFor = "username" >Username
          <input
          type = "text"
          id = "username"
          value = {formData.username}
          name = "username"
          required
          onChange= {handleChange}
          >
          </input>
        </label>

        <label htmlFor = "password" >Password
          <input
          type = "password"
          id = "password"
          value = {formData.password}
          name = "password"
          required
          onChange= {handleChange}
          >
          </input>
        </label>


        <button>Login</button>
  </form>      
  </div>
  )
};

export default Login;