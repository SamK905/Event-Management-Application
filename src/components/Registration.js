import React, { useState } from "react";
import { eventData } from "../data/eventData";

const Registration = ({ user, setPasses, selectedEventId }) => {
  console.log("Selected eventId:", selectedEventId);
  const event = eventData.find((event) => event.id === selectedEventId);
  const [paymentType, setPaymentType] = useState("");
  const [numAdults, setNumAdults] = useState(0);
  const [numChildren, setNumChildren] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPasses((prevPasses) => [...prevPasses, { event, paymentType, numAdults, numChildren }]);
    alert("Registration successful!");
  };

  if (!user) {
    return <h2>Please login to register for an event.</h2>;
  }

  if (!event) {
    return <h2>Event not found.</h2>;
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
