import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import "./MessageCard.css"
import UserContext from "../UserComponents/UserContext";


const MessageCard = ({ id, message_from, message_to, body, sent_at, read_at = null }) => {

  // ***************************************************************


  const { authUser } = useContext(UserContext);

  // ***************************************************************


  return (
    <div className="MessageCard">
      {message_from == authUser ? null : <p>Message from: {message_from}</p>}
      {message_to == authUser ? null : <p>Message to: {message_to}</p>}


      <p>See Additional Details</p>
      <Link to={`/messages/${authUser}/read/${id}`}>See additional Details</Link>
    </div>
  );
};

export default MessageCard;
