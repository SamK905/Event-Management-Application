import React, { useState } from "react";
import { eventData } from "../data/eventData";
import savePass from "./savePass";

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
      newPass, // add the new pass data to the passes state
    ]);
    setIsRegistered(true); // set the isRegistered state to true
  }; 

  if (!user) {
    return <h2>Please login to register for an event.</h2>;
  }

  if (!event) {
    return <h2>Event not found.</h2>;
  }

  if (isRegistered) {
    return (
      <div style={{ backgroundColor: "green", color: "white", padding: "10px" }}>
      <p>Registration successful!</p>
      <button onClick={() => navigateTo("home")}>Go back to Home</button>
      <button onClick={() => navigateTo("active-passes", selectedEventId)}>Go to My Passes</button>
    </div>
    );
  }

  return (
    <div>
      <h2>Register for {event.title}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Number of Adults:</label>
          <button onClick={() => setNumAdults(numAdults - 1)} disabled={numAdults <= 0}>-</button>
          <span>{numAdults}</span>
          <button onClick={() => setNumAdults(numAdults + 1)}>+</button>
        </div>
        <div>
          <label>Number of Children:</label>
          <button onClick={() => setNumChildren(numChildren - 1)} disabled={numChildren <= 0}>-</button>
          <span>{numChildren}</span>
          <button onClick={() => setNumChildren(numChildren + 1)}>+</button>
        </div>
        <div>
          <label htmlFor="paymentType">Payment Type:</label>
            <select id="paymentType" value={paymentType} onChange={(e) => setPaymentType(e.target.value)} required>
              <option value="">Select Payment Type</option>
              <option value="debit">Debit Card</option>
              <option value="credit">Credit Card</option>
            </select>
          </div>
        <button type="submit">Proceed to Payment</button>
      </form>
    </div>
  );
};

export default Registration;
