import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import "./MessageCard.css"
import UserContext from "../UserComponents/UserContext";
import API from "../API";
import {
  Card
} from "reactstrap";
import "./SingleMsgDetails.css"
import AlertNotification from "../Common/AlertNotifications";

const SingleMsgDetails = () => {

  // ***************************************************************

  const { username, message_id } = useParams();
  const { authUser } = useContext(UserContext);

  const [msgDetails, setMsgDetails] = useState(null);
  const [errors, setErrors] = useState(null);

  // ***************************************************************


  useEffect(() => {
    async function viewMsgDetails() {
      try {
        let response = await API.viewSingleMsgData(message_id, username);
        console.log("Deets:", response);
        setMsgDetails(response)
      } catch (e) {
        setErrors(e);
        return;
      };
    };

    viewMsgDetails();
  }, [username, message_id]);


  // ***************************************************************

  return (
    <div>

      {errors ? <AlertNotification messages={errors} /> : null}
      {msgDetails ?
        <div>
          <Card className="SingleMsgDetail-div">
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

            {msgDetails.to_user.username === authUser ?
              <Link to={`/messages/${authUser}/create/${msgDetails.from_user.username}`} style={{ color: "aqua" }}>Reply</Link>
              : null}
          </Card>
        </div>
        : <p>Loading ...</p>}




    </div >
  )
};

export default SingleMsgDetails;