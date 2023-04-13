import React, { useState } from "react";
import { EventRegistrationNavigation } from "./EventRegistrationNavigation";
import EventPassNavigation from "./EventPassNavigation";

const RegisteredUserDashboard = ({ user, eventData, myPassData, navigateTo }) => {
  const [selectedEventId, setSelectedEventId] = useState(null);

  const isUserRegistered = (eventId) => {
    return myPassData.some((pass) => pass.eventId === eventId && pass.status === "active");
  };

  return (
    <div>
      <h2>Registered User Dashboard</h2>
      <div className="event-loop">
        {eventData.map((event) => (
          <EventRegistrationNavigation
            key={event.id}
            event={event}
            user={user}
            navigateTo={navigateTo}
            isRegistered={isUserRegistered(event.id)}
          />
        ))}
      </div>
      {eventData.length > 0 && (
        <EventPassNavigation
          event={eventData[0]}
          navigateTo={navigateTo}
          setSelectedEventId={setSelectedEventId}
        />
      )}
    </div>
  );
};

export default RegisteredUserDashboard;
