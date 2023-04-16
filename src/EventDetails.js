import React, { useContext } from "react";


const EventDetails = ({ event, onCancel }) => {
  if (!event) {
  return <div>Loading...</div>;
  }

  return (
  <div className="event-details">
  <h3>{event.title}</h3>
  <p>{event.description}</p>
  <p>Location: {event.location}</p>
  <p>Date: {event.date}</p>
  <p>Time: {event.time}</p>
  {onCancel && (
  <>
  {" "}
  <button onClick={() => onCancel(event)}>Cancel Pass</button>
  </>
  )}
  </div>
  );
};

export default EventDetails;