import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import "./MessageCard.css"
import UserContext from "../UserComponents/UserContext";


const MessageCard = ({ id, message_from, message_to, body, sent_at, read_at = null }) => {

  const { authUser } = useContext(UserContext);


  return (
    <div className="MessageCard">
      {message_from == authUser ? null : <p>Message from: {message_from}</p>}
      {message_to == authUser ? null : <p>Message to: {message_to}</p>}

      {/* <div>
        <small>{sent_at}</small>
        {body}
        <small> {read_at ? read_at : null}</small>
      </div> */}
      <p>See Additional Details</p>
      <Link to={`/messages/${authUser}/read/${id}`}>See additional Details</Link>

      {/* {authUser !== message_from ?
        <button><Link to={`/messages/${authUser}/create`}>Reply</Link></button>
        :
        null} */}


    </div>
  );
};

export default MessageCard;
