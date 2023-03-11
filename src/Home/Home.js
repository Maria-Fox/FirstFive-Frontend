import React, { useEffect, useMemo, useState, useContext, flushSync } from "react";
import { Card, Label, Form, Input, Button, Table } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import AlertNotification from "../Common/AlertNotifications";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../UserComponents/UserContext";
import uniquid from "uniqid";

const Home = () => {

  const { notes, setNotes } = useContext(UserContext);
  const [parsedNotes, setParsedNotes] = useState(null);
  const [displayNotes, setDisplayNotes] = useState(false);

  // const sampleTrackItem = [{ id: 1, projectName: "Sample project", note: "Message project owner for further details.", additional: "Clone github repo and review code." }];


  // useEffect(() => {
  //   const handleStorage = () => {
  //     console.log("useeffect ran ^^^^^^^^^^^^^^^^^^^^^")

  //     const notesData = JSON.parse(localStorage.getItem("notes"));
  //     console.debug(notesData, "received");
  //     setParsedNotes(notesData);
  //     console.log(parsedNotes);
  //     console.log(`loading changed`)
  //   };

  //   handleStorage();

  // window.addEventListener('storage', handleStorage())
  // return () => window.removeEventListener('storage', handleStorage());
  // }, [setNotes, setParsedNotes]);

  // Attempt with useMemo hook.
  // const parsedNotesReturned = useMemo(function () {
  //   let noteData = JSON.parse(localStorage.getItem("notes"));
  //   setParsedNotes(noteData);
  //   console.log(noteData, "& this is the state", parsedNotes);
  //   setLoading(false);
  // }, [setParsedNotes, setLoading]);

  // ***************************************************************



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

  const handleChange = async (e) => {
    let { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }))
  }


  // ***************************************************************

  const addNote = (e) => {
    try {
      e.preventDefault();
      const existingNotes = JSON.parse(localStorage.getItem('notes')) || [];
      const idForNote = uniquid();
      const newNote = { id: idForNote, ...formData };
      const newItems = [...existingNotes, newNote];
      setNotes(newItems);
      setNoteForm(status => !status);
      setDisplayNotes(status => !status);
    } catch (e) {
      setFormErrors(["Please add a project name and note."])
    };
  };


  // ***************************************************************

  const handleDelete = (idToDelete) => {
    let currentNotes = JSON.parse(localStorage.getItem("notes"));

    const updatedData = currentNotes.filter(note => note.id !== idToDelete);
    console.log(`Now updating/ filtering to:`, updatedData);
    setNotes([...updatedData]);
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


        <Button onClick={addNote}>Add</Button>
      </Form>
    </Card>
  );


  // ***************************************************************



  const noteTable = (
    <div>
      <h1 className="text-white text-center">Track Project Interest</h1>
      <Button onClick={() => setDisplayNotes(false)}>Hide</Button>
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
          {parsedNotes == null ? <p id="loading">Nothing, yet! </p> :
            parsedNotes.map(({ id, projectName, note, additional }) =>
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

  const getNotes = function () {
    let noteData = JSON.parse(localStorage.getItem("notes"));
    setParsedNotes(noteData);

    console.log(noteData, "& this is the state", parsedNotes);
    setDisplayNotes(true);
  };


  return (
    <div className="container" id="chalkboard-div">

      {formErrors ? <AlertNotification messages={formErrors} /> : null}

      {/* Opens form for user to add notes. */}
      <FontAwesomeIcon icon={faEdit} size="4x"
        onClick={() => setNoteForm(status => !status)}
        style={{ color: "aquamarine", float: "right" }} />

      {noteForm ? formHTML : null}

      {displayNotes ? noteTable : <Button onClick={getNotes}>Current Notes</Button>}

    </div>
  )
}

export default Home;