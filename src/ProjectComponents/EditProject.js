import React, { useState, useContext, useEffect } from "react";
import UserContext from "../UserComponents/UserContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import API from "../API";

const EditProject = () => {

  // ***************************************************************


  const { project_id } = useParams();
  const { authUser } = useContext(UserContext);
  const navigate = useNavigate();

  // ***************************************************************


  let project_values = {
    "owner_username": authUser,
    "name": "",
    "project_desc": "",
    "timeframe": "",
    "github_repo": ""
  }

  const [projData, setProjData] = useState(project_values);
  const [errors, setErrors] = useState(null);


  // ***************************************************************


  useEffect(() => {
    async function preloadProjData() {
      try {
        let response = await API.viewProject(project_id);
        // console.log(response.github_repo, "RES IS ")
        setProjData(
          {
            "owner_username": authUser,
            "name": response.name,
            "project_desc": response.project_desc,
            "timeframe": response.timeframe,
            "github_repo": response.github_repo
          });

        console.log(projData);


      } catch (e) {
        console.log(e);
      }
    }

    preloadProjData();
  }, [setProjData]);

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
    try {
      e.preventDefault();
      let response = await API.editProject(project_id, projData);
      alert("Project was updated successfully.");
      navigate(`/projects/${project_id}`);
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
      {!projData ? <p>Loading...</p> :
        <div>
          <h1>Update: {projData.name}</h1>

          <div>
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
        </div>
      }
    </div>
  )
};

export default EditProject;