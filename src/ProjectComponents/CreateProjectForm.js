import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../API";
import UserContext from "../UserComponents/UserContext";
import AlertNotification from "../Common/AlertNotifications";


const CreateProjectForm = () => {

  // ***************************************************************
  let navigate = useNavigate();
  let { authUser, matchedProjectIds, setMatchedProjectIds } = useContext(UserContext);

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
      console.log("resp is:", response);
      // user is instantly matched with project. They can find it under the 'posts' Nav item.

      let id = response.id;
      console.log(id, "&&&&&&&&&&&&&&&&");

      // Newly created proj id goes into matches.
      setMatchedProjectIds([...matchedProjectIds, id]);

      // probably navigate elsewhere. temp for now
      // alert("Project was added successfully.");
      navigate(`/projects/created/by/${authUser}`);
    } catch (e) {
      setErrors(e);
      return;
    };
  };

  // ***************************************************************


  return (
    <div>
      <h1>Create Project</h1>

      {errors ? <AlertNotification messages={errors} /> : null}

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