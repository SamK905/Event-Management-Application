import React from 'react';
import { eventData } from "../data/eventData";
import { EventRegistrationNavigation } from "./EventRegistrationNavigation";
import GuestDashboard from "./GuestDashboard";
import Logout from './Logout';

const GuestHome = ({ user, navigateTo }) => {
  const isUserRegistered = (eventId) => {
    return false;
  };
  const handleLogout = () => {
    console.log('User has logged out');
    navigateTo("login");
  };

  return (
    <>
      <div className='pass-navigation'>
        <Logout onLogout={handleLogout} />
        <GuestDashboard navigateTo={navigateTo}/>
      </div>
    </>
  );
};

export default GuestHome;
