import React, { useState } from 'react';
import { eventData } from "../data/eventData";
import { EventRegistrationNavigation } from "./EventRegistrationNavigation";
import EventPassNavigation from "./EventPassNavigation";
import AdminDashboard from "./AdminDashboard";
import myPassData from "../data/myPassData";
import "../AdminHome.css";
import "../AdminDashboard.css";
import Logout from './Logout';

const AdminHome = ({ user, setPasses, navigateTo }) => {
  const [selectedEventId, setSelectedEventId] = useState(null);
  console.log("User:", user);
  console.log("Events:", eventData);

  const isUserRegistered = (eventId) => {
    return myPassData.some((pass) => pass.eventId === eventId && pass.status === "active");
  };

  const handleLogout = () => {
    console.log('User has logged out');
    navigateTo("login");
  };
  
  return (
    <>
      <AdminDashboard />
      <Logout onLogout={handleLogout} />
    </>
  );
};

export default AdminHome;
