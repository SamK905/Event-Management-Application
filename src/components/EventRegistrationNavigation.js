import React from "react";

export const EventRegistrationNavigation = ({ event, user, navigateTo, isRegistered }) => {
  const handleRegistration = () => {
    if (user.role === "guest") {
      navigateTo("login");
    } else {
      navigateTo("register", event.id);
    }
  };

  const handleMyPasses = () => {
    navigateTo("my-passes");
  };

  return (
    <div className="event-registration-navigation">
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <p>{event.location}</p>
      {isRegistered ? (
        <button onClick={handleMyPasses}>My Pass</button>
      ) : (
        user.role === "guest" ? (
          <button onClick={handleRegistration}>Login to Register</button>
        ) : (
          <button onClick={handleRegistration}>Register</button>
        )
      )}
    </div>
  );
};
