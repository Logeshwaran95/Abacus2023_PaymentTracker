import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import Swal from "sweetalert2";

function App() {
  const [formValues, setFormValues] = useState({
    eventid: "",
    abacusid: "",
  });
  const [formErrors, setFormErrors] = useState({
    eventid: "",
    abacusid: "",
  });

  const validEventIds = ["12", "13", "19", "20", "21"];

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
    try{
      //pass via parameter like first eventid/abacusid/amount
      axios.get('https://abacus.org.in/api/org/' + eventid + '/' + abacusid)
      .then(function (response) {
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Payment has been successfully added',
        })
      }
      )
      .catch(function (error) {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      }
      );
    }
    catch(error){
      console.log(error);
    }
  };

  return (
    <div className="App">

      <form onSubmit={handleSubmit}>
        <center>
        <h1>Abacus Payment Tracker</h1>
        </center>
        <div className="form-group">
          <label htmlFor="eventid">Event ID:</label>
          <input
            type="text"
            id="eventid"
            name="eventid"
            value={formValues.eventid}
            onChange={handleInputChange}

          />
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
      </form>
    </div>
  );
}

export default App;
