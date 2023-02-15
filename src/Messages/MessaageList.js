import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import API from "../API";
import AlertNotification from "../Common/AlertNotifications";
import UserContext from "../UserComponents/UserContext";
import MessageCard from "./MessageCard";
import { Card, CardText } from "reactstrap";


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

  let noMsgs = (
    <Card >
      <CardText style={{ textAlign: "center" }}>No messages, yet!</CardText>
    </Card>
  );

  // ***************************************************************


  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>Messages</h1>

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
          : noMsgs
      }
    </div >
  )
};

export default MessageList;