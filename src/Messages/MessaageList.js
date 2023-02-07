import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../API";
import UserContext from "../UserComponents/UserContext";
import MessageCard from "./MessageCard";

const MessageList = () => {

  // ***************************************************************

  const [userMessages, setUserMessages] = useState(null);
  const { authUser } = useContext(UserContext);
  const { username } = useParams();
  console.log("Messages - user is ", authUser);


  // ***************************************************************

  useEffect(() => {
    async function viewUserMessages() {
      try {
        let response = await API.getAllUserMessages(username);
        setUserMessages(response);
        console.log(userMessages);
      } catch (e) {
        console.log(e);
      }
    };
    viewUserMessages();
  }, [setUserMessages]);

  // ***************************************************************


  return (
    <div>
      <h1>Messages</h1>

      {
        userMessages && userMessages.length > 0 ?
          userMessages.map(({ id, message_from, message_to, body, sent_at }) =>
            <MessageCard
              key={id}
              id={id}
              message_from={message_from}
              message_to={message_to}
              body={body}
              sent_at={sent_at}
            />
          )
          : <p>No messages, yet!</p>
      }
    </div >
  )
};

export default MessageList;