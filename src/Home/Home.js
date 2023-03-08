import React, { useEffect, useState, useContext } from "react";
import { Card, Label, Form, Input, Button, Table } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import AlertNotification from "../Common/AlertNotifications";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../UserComponents/UserContext";
import uniquid from "uniqid";


const Home = () => {

  // const sampleTrackItem = [{ id: 1, projectName: "Sample project", note: "Message project owner for further details.", additional: "Clone github repo and review code." }];

  const [displayItems, setDisplayItems] = useState(null);
  const { setUserNotes } = useContext(UserContext);

  useEffect(() => {
    const handleStorage = () => {
      console.log("useeffect ran ^^^^^^^^^^^^^^^^^^^^^")
      const data = JSON.parse(localStorage.getItem("tracker"));
      console.log(data, "Parsed tracker from localStorage.");
      setDisplayItems(data);
    };

    window.addEventListener('storage', handleStorage())
    return () => window.removeEventListener('storage', handleStorage());
  }, [setUserNotes, setDisplayItems]);

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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(formData, "is formData");

      // Ensure both fields have at east one char.
      if (formData.projectName.length > 1 && formData.note.length > 1) {
        let currentNotes = JSON.parse(localStorage.getItem('tracker')) || [];

        let idForNote = uniquid();
        const newNote = { id: idForNote, ...formData };
        const allNotes = [...currentNotes, newNote];

        setUserNotes(allNotes);
        setDisplayItems(allNotes);
        setNoteForm(status => !status);
      }
    } catch (e) {
      setFormErrors(["Please add a project name and note."])
    }
  };

  // ***************************************************************

  const handleDelete = (idToDelete) => {
    let remainingNotes = displayItems.filter(note => note.id !== idToDelete);
    setUserNotes(remainingNotes);
    setDisplayItems(remainingNotes);
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
          {displayItems == null ? <p id="loading">Nothing, yet! </p> :
            displayItems.map(({ id, projectName, note, additional }) =>
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