import React, { useContext, useEffect, useState } from "react";
import { Card, Label, Form, Input, CardTitle, Button, Table } from "reactstrap";
import UserContext from "../UserComponents/UserContext";
import "./Home.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import AlertNotification from "../Common/AlertNotifications";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


const Home = () => {

  const { authUser, userNotes, setUserNotes } = useContext(UserContext);
  const [displayItems, setDisplayItems] = useState(null);


  useEffect(() => {
    function getUserNotes() {
      console.log("Home use effect ran");

      let trackerObj = window.localStorage.getItem('tracker');
      console.log(trackerObj, "tracker obj")
      if (trackerObj == null) {
        setUserNotes([{ id: 1, projectName: "Sample here", note: "Contact project owner", additional: "Review github repo" }])
      } else {
        let parsedObj = JSON.parse(trackerObj);
        console.log(parsedObj, "parsedObj")
      }
    };

    getUserNotes();

  }, [setUserNotes]);

  let initialState = {
    projectName: null,
    note: null,
    additional: null
  };

  // ***************************************************************

  const [noteForm, setNoteForm] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState(null);

  // ***************************************************************

  const msgBody = (
    <Card style={{ backgroundColor: "transparent", color: "whiteSmoke", padding: "2%" }}
      id="greeter-welcome">
      <CardTitle>Hi, {authUser}!</CardTitle>
    </Card>
  );


  // ***************************************************************

  const handleChange = async (e) => {
    let { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }))
  }


  // ***************************************************************

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(formData, "is formData");

      // Ensure both fields have at east one char.
      if (formData.projectName.length > 1 && formData.note.length > 1) {
        let currentNotes = JSON.parse(localStorage.getItem('tracker')) || [];
        // console.log(currentNotes)


        let idForNote = currentNotes.length + 1 || 1;
        const newNote = { id: idForNote, ...formData };
        const allNotes = [...currentNotes, newNote];
        setUserNotes(allNotes);

        // setUserNotes(currentNotes);
        // setDisplayItems([...currentNotes]);
        // console.log(`this is the diisplay items`, displayItems)
        // setDisplayItems(allNotes);
        setNoteForm(status => !status);
      }
    } catch (e) {
      console.log(e, "*******")
      setFormErrors(["Please add a project name and note."])
    }
  };

  // ***************************************************************

  const handleDelete = (idToDelete) => {
    localStorage.removeItem(idToDelete); //returns undefined.

    let remainingNotes = userNotes.filter(note => note.id !== idToDelete);
    setUserNotes(remainingNotes);
  };


  // ***************************************************************


  const formHTML = (
    <Card className="container bg-dark">
      <h1 className="text-white">New Note:</h1>
      <Form className="container">
        <Label className="text-white" for="projectName">
          Project Name:
        </Label>
        <Input
          type="text"
          id="projectName"
          name="projectName"
          placeholder="Create React App"
          required
          onChange={handleChange}
        >
        </Input>

        <Label className="text-white" for="note">
          Note:
        </Label>
        <Input
          type="text"
          id="note"
          name="note"
          placeholder="Interested- messaged project owner. Awaiting response."
          onChange={handleChange}
        >
        </Input>


        <Label className="text-white" for="additional">
          Additional:
        </Label>
        <Input
          type="text"
          id="additional"
          name="additional"
          placeholder="Further review github repo."
          onChange={handleChange}
        >
        </Input>


        <Button onClick={handleSubmit}>Add</Button>
      </Form>
    </Card>
  );


  // ***************************************************************



  const noteTable = (
    <div>
      <h1 className="text-white text-center">Track Project Interest</h1>
      <Table responsive bordered className="text-white mt-4">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Note</th>
            <th>Additional</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {userNotes == null ? <p id="loading">Loading... </p> :
            userNotes.map(({ id, projectName, note, additional }) =>
              <tr key={id}>
                <td>{projectName}</td>
                <td>{note}</td>
                <td>{additional}</td>
                <td><Button onClick={() => handleDelete(id)}> <FontAwesomeIcon icon={faTrash} /></Button></td>
              </tr>

            )
          }
        </tbody>


      </Table>
    </div>
  )

  // ***************************************************************


  return (
    <div className="container" id="chalkboard-div">
      {/* {authUser ? msgBody : null} */}

      {formErrors ? <AlertNotification messages={formErrors} /> : null}

      {/* Opens form for user to add notes. */}
      <FontAwesomeIcon icon={faEdit} size="4x"
        onClick={() => setNoteForm(status => !status)}
        style={{ color: "aquamarine", float: "right" }} />


      {noteForm ? formHTML : null}

      {noteTable}


    </div>
  )
}

export default Home;