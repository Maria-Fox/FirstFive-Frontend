import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./MessageCard.css"
import UserContext from "../UserComponents/UserContext";
import {
  Card, CardTitle, CardSubtitle
} from "reactstrap"


const MessageCard = ({ id, message_from, message_to, body, sent_at, read_at = null }) => {

  // ***************************************************************


  const { authUser } = useContext(UserContext);

  // ***************************************************************


  return (
    <div className="MessageCard">
      <Card>
        {message_from === authUser ? null : <CardTitle>Message from: {message_from}</CardTitle>}
        {message_to === authUser ? null : <CardTitle>Message to: {message_to}</CardTitle>}

        <CardSubtitle>See Additional Details</CardSubtitle>
        <Link to={`/messages/${authUser}/read/${id}`} className="MessageCard-Button">See additional Details</Link>
      </Card>
    </div>
  );
};

export default MessageCard;
