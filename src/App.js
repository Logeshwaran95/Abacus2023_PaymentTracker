import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import Swal from "sweetalert2";
import {eventsList} from "./eventsList";

function App() {
  const [formValues, setFormValues] = useState({
    eventid: "",
    abacusid: "",
  });
  const [formErrors, setFormErrors] = useState({
    eventid: "",
    abacusid: "",
  });

  const eventNames = {
    "12": "Gamindrome",
    "13": "Eight Square",
    "19": "Cloud Computing",
    "20": "2D Animation",
    // "21": "Web 3.0",
  };

  const validEventIds = Object.keys(eventNames);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { eventid, abacusid } = formValues;

    // Validate the form fields
    let errors = {};
    if (!eventid) {
      errors.eventid = "Event ID is required";
    } else if (!validEventIds.includes(eventid)) {
      errors.eventid = "Invalid Event ID";
    }
    if (!abacusid) {
      errors.abacusid = "Abacus ID is required";
    } else if (!/^\d{8}$/.test(abacusid)) {
      errors.abacusid = "Abacus ID must be 8 digits";
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Form is valid, log the form data to the console
    console.log(formValues);

    //we are ready to send the data to the server and pass via parameter like first eventid/abacusid/amount
    //then we will get the response from the server and show the alert message
    try {
      //pass via parameter like first eventid/abacusid/amount
      axios
        .get("https://abacus.org.in/api/org/" + eventid + "/" + abacusid)
        .then(function (response) {
          console.log(response);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Payment has been successfully added",
          });
        })
        .catch(function (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDownload = async () => {
    if (!selectedEvent) {
      setErrorMessage('Please select an event');
      return;
    }

    try {
      
      const response = await axios.get(`https://abacus.org.in/api/org/${selectedEvent}`, { responseType: 'blob' });
  const blob = new Blob([response.data], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${
    eventsList[selectedEvent]
  } Detils.csv`);
  document.body.appendChild(link);
  link.click();
  Swal.fire({
    icon: "success",
    title: "Success",
    text: `${eventsList[selectedEvent]} File has been successfully downloaded`,
  });
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to download file');
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const renderEvents = () => {
    return Object.entries(eventsList).map(([id, name]) => (
      <option key={id} value={id}>
        {name}
      </option>
    ));
  };

  return (
    <div className="App">
      
      <form onSubmit={handleSubmit}>
        <center>
          <h1>Abacus Payment Tracker</h1>
        </center>
        <div className="form-group">
          <label htmlFor="eventid">Event:</label>
          <select
            id="eventid"
            name="eventid"
            value={formValues.eventid}
            onChange={handleInputChange}
          >
            <option value="">-- Select Event --</option>
            {validEventIds.map((id) => (
              <option key={id} value={id}>
                {eventNames[id]}
              </option>
            ))}
          </select>
          {formErrors.eventid && (
            <div className="error">{formErrors.eventid}</div>
          )}
        </div>

        <div className="form-group">
        <label htmlFor="abacusid">Abacus ID:</label>
          <input
            type="text"
            id="abacusid"
            name="abacusid"
            value={formValues.abacusid}
            onChange={handleInputChange}
          />
          {formErrors.abacusid && (
            <div className="error">{formErrors.abacusid}</div>
          )}
        </div>
        <button type="submit">Submit</button>
        <br></br>


        <h1>Download Event Info Files</h1>
      <div className="form-group">
        <label htmlFor="event-select">Select an event:</label>
        <select
          id="event-select"
          onChange={(e) => setSelectedEvent(e.target.value)}
          value={selectedEvent || ''}
        >
          <option value="">-- Select an event --</option>
          {renderEvents()}
        </select>
      </div>
      <div className="form-group">
        <button type="button" onClick={handleDownload}>
          Download
        </button>
        {errorMessage && <div className="error">{errorMessage}</div>}
      </div>
      </form>

      
    </div>

    
  );
}
export default App;
