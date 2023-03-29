import React from 'react';
import { eventData } from "../data/eventData";

const EventPassNavigation = ({ event, navigateTo }) => (
  <div className='pass-nav'>
    {event ? (
      <>
        <h3>{event.title}</h3>
        <p>{event.description}</p>
        <button onClick={() => navigateTo("/my-passes")}>My Passes</button>
      </>
    ) : (
      <h3>Loading event information...</h3>
    )}
  </div>
);


const EventRegistrationNavigation = ({ event, navigateTo }) => (
  <div className='reg-nav'>
    <h3>{event.title}</h3>
    <button onClick={() => navigateTo("register", event.id)}>Register</button>
  </div>
);


const Home = ({ user, setPasses, navigateTo }) => {
  console.log("User:", user);
  console.log("Events:", eventData);

  return (
    <>
      <div className='pass-navigation'>
        <h1>Event Management Portal</h1>
        <div className='event-loop'>
          {eventData.map((event) => (
            <EventRegistrationNavigation key={event.id} event={event} navigateTo={navigateTo} />
          ))}
        </div>
        <button onClick={() => navigateTo("my-passes")}>My Passes</button>
      </div>
    </>
    
  );
};

export default Home;
