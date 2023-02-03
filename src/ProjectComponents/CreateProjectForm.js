import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../API";
import UserContext from "../UserComponents/UserContext";


const CreateProjectForm = () => {

  // ***************************************************************
  let navigate = useNavigate();
  let { authUser } = useContext(UserContext);

  let initial_state = {
    name: "",
    project_desc: "",
    timeframe: "",
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
      // console.log("resp is:", response);
      // user is instantly matched with project. They can find it under the 'projects' Nav item.
      let proj_id = response.id;

      // probably navigate elsewhere. temp for now
      alert("Project was added successfully.");
      navigate(`/matches/view/${authUser}/all`);
    } catch (e) {
      console.log(e);
    };
  };

  // ***************************************************************

  let printErrors = () => {
    let errorsToPrint = errors.e[0];
    return (
      <h2>{errorsToPrint}</h2>
    );
  };

  // ***************************************************************


  return (
    <div>
      <h1>Create Project</h1>

      {errors ? printErrors() : null}

      <form onSubmit={handleSubmit}>

        <label htmlFor="name" >Project Name
          <input
            type="text"
            id="name"
            value={projData.name}
            name="name"
            required
            onChange={handleChange}
          >
          </input>
        </label>

        <label htmlFor="project_desc" >Project Description
          <textarea
            type="text"
            id="project_desc"
            value={projData.project_desc}
            name="project_desc"
            required
            onChange={handleChange}
          >
          </textarea>
        </label>

        <label htmlFor="timeframe" >Timeframe
          <input
            type="text"
            id="timeframe"
            value={projData.timeframe}
            name="timeframe"
            placeholder="3 weeks"
            required
            onChange={handleChange}
          >
          </input>
        </label>

        <label htmlFor="github_repo" >Github Repo
          <input
            type="text"
            id="github_repo"
            value={projData.github_repo}
            name="github_repo"
            required
            onChange={handleChange}
          >
          </input>
        </label>

        <button>Submit</button>

      </form>
    </div>
  )
}

export default CreateProjectForm;