import React, { useState } from "react";
import "./App.css";

function App() {
  const [formValues, setFormValues] = useState({
    eventid: "",
    abacusid: "",
    amount: "",
  });
  const [formErrors, setFormErrors] = useState({
    eventid: "",
    abacusid: "",
    amount: "",
  });

  const validEventIds = ["12", "13", "19", "20", "21"];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { eventid, abacusid, amount } = formValues;

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
    //amount shouldnt contain any special characters or alphabets
    if (!amount) {
      errors.amount = "Amount is required";
    }
    if(!/^\d+$/.test(amount)){
      errors.amount = "Amount should be a number";
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Form is valid, log the form data to the console
    console.log(formValues);
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
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={formValues.amount}
            onChange={handleInputChange}
          />
          {formErrors.amount && (
            <div className="error">{formErrors.amount}</div>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
