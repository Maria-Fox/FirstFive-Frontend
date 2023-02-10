import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import API from "../API";
import AlertNotification from "../Common/AlertNotifications";
import UserContext from "../UserComponents/UserContext";
import MessageCard from "./MessageCard";


const MessageList = () => {

  // ***************************************************************

  const { username } = useParams();
  const { authUser } = useContext(UserContext);
  const [userMessages, setUserMessages] = useState(null);
  const [errors, setErrors] = useState(null)


  // ***************************************************************

  useEffect(() => {
    async function viewUserMessages() {
      try {
        let response = await API.getAllUserMessages(username);
        setUserMessages(response);
      } catch (e) {
        setErrors(e);
      }
    };
    viewUserMessages();
  }, [setUserMessages, username]);

  // ***************************************************************


  return (
    <div>
      <h1>Messages</h1>

      {errors ? <AlertNotification messages={errors} /> : null}

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