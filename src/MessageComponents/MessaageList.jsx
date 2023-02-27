import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
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
    <Card className="container p-3">
      <CardText style={{ textAlign: "center" }}>No messages, yet!</CardText>
      <CardText>Messages can only be exhanged between users who have mutual project matches. To create a message please visit your matches and click on the user you want to message.</CardText>
      <Link to={`/matches/view/${authUser}/all`}>Matches</Link>
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