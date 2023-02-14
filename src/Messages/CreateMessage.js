import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../API";
import AlertNotification from "../Common/AlertNotifications";
import UserContext from "../UserComponents/UserContext";
import { Form, Label, Input, Button, Card } from "reactstrap"

const CreateMessage = () => {

  // message from, message_to
  const { username, to_username } = useParams();
  console.log(`FROM USER ${username} TO USER ${to_username}`);

  // ***************************************************************

  let initial_state = {
    message_to: to_username,
    body: ""
  };

  // ***************************************************************

  const [msgData, setMsgData] = useState(initial_state);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const { authUser } = useContext(UserContext);

  const handleChange = async (e) => {
    let { name, value } = e.target;

    setMsgData(msgData => ({
      ...msgData,
      [name]: value
    }));
  };

  // ***************************************************************


  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log({ message_from: authUser, ...msgData })
      await API.createMessage(authUser, { message_from: authUser, ...msgData });
      alert("Created msg");
      navigate(`/messages/${authUser}/all`);
    } catch (e) {
      setErrors(e);
      return;
    };
  };


  // ***************************************************************


  return (
    <Card>
      <h1 classname="PageTitle">New Message</h1>

      {errors ? <AlertNotification messages={errors} /> : null}

      <Form onSubmit={handleSubmit}>

        <p>Message to: {to_username}</p>

        <Label htmlFor="body" >
          <Input
            type="textarea"
            id="body"
            value={msgData.body}
            name="body"
            placeholder="Hi - I am interested in hearing more about your project. I have frontend expereince. Can you use a new project member?"
            required
            cols="100"
            rows="10"
            onChange={handleChange}
          >
          </Input>
        </Label>

        <Button>Send</Button>

      </Form>
    </Card >
  )
};

export default CreateMessage;