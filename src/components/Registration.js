import React, { useState } from "react";
import { eventData } from "../data/eventData";
import savePass from "./savePass";
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const Registration = ({ user, setPasses, selectedEventId, navigateTo }) => {
  console.log("Selected eventId:", selectedEventId);
  const event = eventData.find((event) => event.id === selectedEventId);
  const [paymentType, setPaymentType] = useState("");
  const [numAdults, setNumAdults] = useState(0);
  const [numChildren, setNumChildren] = useState(0);
  const [isRegistered, setIsRegistered] = useState(false); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedEvent = eventData.find((event) => event.id === selectedEventId);
    const newPass = savePass(selectedEvent, paymentType, numAdults, numChildren); // call savePass and get the new pass data
    setPasses((prevPasses) => [
      ...prevPasses,
      //newPass, // add the new pass data to the passes state
    ]);
    setIsRegistered(true); // set the isRegistered state to true
  }; 

  if (!user) {
    return <h2>Please login to register for an event.</h2>;
  }

  if (!event) {
    return <h2>Event not found.</h2>;
  }

  return (
<div class="login-form">
{isRegistered?
  <Stack sx={{ width: '100%' }} spacing={2}>
  <Alert onClose={() =>navigateTo("active-passes", selectedEventId)}>Payment successful!</Alert>
</Stack>:''
}
<form onSubmit={handleSubmit}>
<h1>Register for Event: {event.name}</h1>
  <div style={{ textAlign:'center'}}>
<div class="input">
  <label>Name:</label>     <input type="text" placeholder="Enter your name"/>
</div>

<div class="input">
  <label>Phone:</label>     <input type="text" placeholder="Enter your phone number"/>
</div>

    <div class="input-field">
      <label>Number of Adults:</label>
      <button onClick={() => setNumAdults(numAdults - 1)} disabled={numAdults <= 0}>-</button>
      <span>{numAdults}</span>
      <button onClick={() => setNumAdults(numAdults + 1)}>+</button>
    </div>

    <div class="input-field">
      <label>Number of Children:</label>
      <button onClick={() => setNumChildren(numChildren - 1)} disabled={numChildren <= 0}>-</button>
      <span>{numChildren}</span>
      <button onClick={() => setNumChildren(numChildren + 1)}>+</button>
    </div>

    <h3>Fees:  ${event.registrationFee*(numAdults+numChildren)}</h3>


    <div class="input-field">
      <label htmlFor="paymentType">Payment Type:</label>
      <select id="paymentType" value={paymentType} onChange={(e) => setPaymentType(e.target.value)} required>
      <option value="">Select Payment Type</option>
      <option value="debit">Debit Card</option>
      <option value="credit">Credit Card</option>
      </select>
      {/* <button type="submit">Proceed to Payment</button> */}
    </div>

    <div class="input">
      <label>Card Number:</label>     <input type="text" placeholder="Enter your card Number"/>
    </div>

    <div style={{padding:'15px'}}>Expiry date:   
      <input style={{marginLeft:'10px',width: '30px', border: '1px solid black' }} type="text" placeholder="mm"/> 
      <input style={{width: '30px', border: '1px solid black' }} type="text" placeholder="yy"/> 
      <span> CVV:  <input style={{width: '50px', border: '1px solid black' }}/></span>
    </div>

  </div>
  <div className="action">
  <button onClick={() => {}}>Pay & Submit</button>
  </div>
</form>
</div>
  );
};

export default Registration;
