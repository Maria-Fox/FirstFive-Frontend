import React, {useState} from "react";
import {useNavigate} from "react-router-dom"

const RegisterForm = ({registerUser}) => {
  

  // ***************************************************************

  let initial_state = {
    username : "",
    password : "",
    email : "",
    bio: ""
  };

  let navigate = useNavigate();

  let [formData, setFormData] = useState(initial_state);
  let [errors, setErrors] = useState(null);

  // ***************************************************************

  let handleChange = (e) => {
    let {name, value} = e.target;
    setFormData(formData => ({
      ...formData,
      [name]:value
    }))
  };

  // ***************************************************************

  async function handleSubmit (e) {
    e.preventDefault();
    console.log(formData)
    try {
      let response = await registerUser(formData);
      console.log("resp is:", response);

      if(response.success){
        console.log("success");
        navigate("projects/all");
      } else {
        setErrors(response);
      };
    } catch (e) {
      console.log(e);
    };
  };

  // ***************************************************************

  let printErrors = () => {
    let errorsToPrint = errors.e[0];
    return(
      <h2>{errorsToPrint}</h2>
    );
  };


  return (
    <div>
      <h1>Register</h1>

      { errors ? printErrors() : null}

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

        <label htmlFor = "Email" >Email
          <input
          type = "email"
          id = "email"
          value = {formData.email}
          name = "email"
          required
          onChange= {handleChange}
          >
          </input>
        </label>

        <label htmlFor = "bio" >Bio
          <input
          type = "text"
          id = "bio"
          value = {formData.bio}
          name = "bio"
          required
          onChange= {handleChange}
          >
          </input>
        </label>

        <button>Join</button>

      </form>      
    </div>
  )
};

export default RegisterForm;