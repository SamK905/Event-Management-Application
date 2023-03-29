import React from 'react';

const EventDetails = ({ pass, onCancel }) => {
  return (
    <div className="event-details">
      <h3>{pass.event.name}</h3>
      <p>Date: {pass.event.date}</p>
      <p>Location: {pass.event.location}</p>
      <p>Registered on: {pass.registrationDate}</p>
      {pass.status === 'active' && (
        <button onClick={() => onCancel(pass)}>Cancel Pass</button>
      )}
      {pass.status === 'cancelled' && <p>Pass cancelled</p>}
    </div>
  );
};

export default EventDetails;
