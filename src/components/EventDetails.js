import React from "react";

const EventDetails = ({ event, paymentInfo, onCancel }) => {
  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="event-details">
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <p>
        Payment Info: {paymentInfo}
        {onCancel && (
          <>
            {" "}
            - <button onClick={() => onCancel(event)}>Cancel Pass</button>
          </>
        )}
      </p>
    </div>
  );
};

export default EventDetails;
