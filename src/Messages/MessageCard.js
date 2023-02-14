import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./MessageCard.css"
import UserContext from "../UserComponents/UserContext";
import { Card, CardTitle } from "reactstrap"


const MessageCard = ({ id, message_from, message_to }) => {

  // ***************************************************************


  const { authUser } = useContext(UserContext);

  // ***************************************************************


  return (
    <Card className="container MessageCard">
      {message_from === authUser ? null : <CardTitle>Message from: {message_from}</CardTitle>}
      {message_to === authUser ? null : <CardTitle>Message to: {message_to}</CardTitle>}


      <Link style={{ color: "aqua" }}
        to={`/messages/${authUser}/read/${id}`} className="MessageCard-Button">See additional Details</Link>
    </Card>
  );
};

export default MessageCard;
