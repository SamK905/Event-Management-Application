import React from "react";

export const EventRegistrationNavigation = ({ event, user, navigateTo, isRegistered }) => {
  const handleRegistration = () => {
    navigateTo("register", event.id);
  };

  const handleMyPasses = () => {
    navigateTo("my-passes");
  };

  return (
    <div className="event-registration-navigation">
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      {isRegistered ? (
        <button onClick={handleMyPasses}>My Pass</button>
      ) : (
        <button onClick={handleRegistration}>Register</button>
      )}
    </div>
  );
};
