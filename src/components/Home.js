import React, { useState } from 'react';
import { eventData } from "../data/eventData";
import { EventRegistrationNavigation } from "./EventRegistrationNavigation";
import myPassData from "../data/myPassData";
import EventPassNavigation from "./EventPassNavigation";
import AdminDashboard from "./AdminDashboard";
import RegisteredUserDashboard from "./RegisteredUserDashboard";
import GuestDashboard from "./GuestDashboard";


const Home = ({ user, setPasses, navigateTo }) => {
  const [selectedEventId, setSelectedEventId] = useState(null);
  console.log("User:", user);
  console.log("Events:", eventData);

  const isUserRegistered = (eventId) => {
    return myPassData.some((pass) => pass.eventId === eventId && pass.status === "active");
  };
  const renderDashboard = () => {
    switch (user.role) {
      case "admin":
        return <AdminDashboard />;
      case "user":
        return (
          <RegisteredUserDashboard
            user={user}
            eventData={eventData}
            myPassData={myPassData}
            navigateTo={navigateTo}
          />
        );
      case "guest":
        return <GuestDashboard />;
      default:
        return null;
    }
  };
  return (
    <>
      <div className='pass-navigation'>
        <h1>Event Management Portal</h1>
        <div className='event-loop'>
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
    </>
  );
};

export default Home;