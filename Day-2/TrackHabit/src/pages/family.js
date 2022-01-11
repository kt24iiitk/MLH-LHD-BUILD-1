import React, { useState, Fragment } from 'react';
import '../App.css'
import { nanoid } from "nanoid";
import data from "./mock-data.json";
import ReadOnlyRow from "../components/ReadOnlyRow";
import EditableRow from "../components/EditableRow";

const Family = () => {
	const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    habit: "",
    date: "",
    day: "",
    streak: "",
  });

  const [editFormData, setEditFormData] = useState({
    habit: "",
    date: "",
    day: "",
    streak: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      habit: addFormData.habit,
      date: addFormData.date,
      day: addFormData.day,
      streak: addFormData.streak,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      habit: editFormData.habit,
      date: editFormData.date,
      day: editFormData.day,
      streak: editFormData.streak,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      habit: contact.habit,
      date: contact.date,
      day: contact.day,
      streak: contact.streak,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };

  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table className="center">
          <thead>
            <tr>
              <th>Habit</th>
              <th>Date</th>
              <th>Day</th>
              <th>Streak</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <Fragment>
                {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Track your Habit</h2>
      <form className="gun" onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="habit"
          required="required"
          placeholder="Enter a habit..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="date"
          required="required"
          placeholder="Enter date..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="day"
          required="required"
          placeholder="Enter a day..."
          onChange={handleAddFormChange}
        />
        <input
          type="number"
          name="streak"
          required="required"
          placeholder="Enter your streak..."
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Family;
