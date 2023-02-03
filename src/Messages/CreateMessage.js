import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../API";
import UserContext from "../UserComponents/UserContext";

const CreateMessage = () => {

  // ***************************************************************

  let initial_state = {
    message_to: "",
    body: ""
  };

  // ***************************************************************

  const [msgData, setMsgData] = useState(initial_state);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const { authUser } = useContext(UserContext);

  const handleChange = async (e) => {
    let { name, value } = e.target;

    setMsgData(msgData => ({
      [name]: value,
      ...msgData
    }));
  };

  // ***************************************************************


  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let newMsg = await API.createMessage({ message_from: authUser, ...msgData });
      navigate("/")
    } catch (e) {
      console.log(e);
    };
  };

  let printErrors = () => {
    let errorsToPrint = msgData.e[0];
    return (
      <h2>{errorsToPrint}</h2>
    );
  };

  // ***************************************************************


  return (
    <div>
      <h1>New Message</h1>

      {errors ? printErrors() : null}

      <form onSubmit={handleSubmit}>

        <label htmlFor="body" >
          <textarea
            type="text"
            id="body"
            value={msgData.body}
            name="body"
            placeholder="Hi - I am interested in hearing more about your project. Are you looking to take on more project members?"
            required
            cols="100"
            rows="10"
            onChange={handleChange}
          >
          </textarea>
        </label>

        <button>Send</button>

      </form>
    </div >
  )
};

export default CreateMessage;