import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import "./MessageCard.css"
import UserContext from "../UserComponents/UserContext";
import API from "../API";

const SingleMsgDetails = () => {
  let { username, message_id } = useParams();
  const [msgDetails, setMsgDetails] = useState(null);
  let { authUser } = useContext(UserContext);

  useEffect(() => {
    async function viewMsgDetails() {
      try {
        let response = await API.viewSingleMsgData(message_id, username);
        console.log("Deets:", response);
        setMsgDetails(response)
      } catch (e) {
        console.log(e);
      };
    };

    viewMsgDetails();
  }, []);




  return (
    <div>
      {msgDetails ?
        <div>
          <h1>Message from: {msgDetails.from_user.username}</h1>
          <small>{msgDetails.from_user.bio}</small>

          <h2>Message to: {msgDetails.to_user.username}</h2>

          <p>Sent: {msgDetails.sent_at}</p>
          {msgDetails.read_at ? <p>Read: {msgDetails.read_at}</p> : null}

          <div>
            <p>
              {msgDetails.body}
            </p>
          </div>

        </div>
        : <p>Loading ...</p>}




    </div>
  )
};

export default SingleMsgDetails;