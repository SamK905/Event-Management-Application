import React, { useState } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Registration from "./components/Registration";
import AdminHome from "./components/AdminHome";
import myPassData from "./data/myPassData";
import UserHome from "./components/UserHome";
import GuestHome from "./components/GuestHome";
import './App.css';
import GuestDashboard from "./components/GuestDashboard";
import Ticket from "./components/Ticket";
import MyPasses from "./components/MyPasses";


import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


function App() {
  const [user, setUser] = useState(null);
  const [passes, setPasses] = useState(myPassData);
  const [page, setPage] = useState("login");
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("active");


  const navigateTo = (targetPage, eventId, status) => {
    setPage(targetPage);
    if (eventId) setSelectedEventId(eventId);
    if (status) setSelectedStatus(status);
    if (targetPage === "my-passes") {setSelectedUser(user); setSelectedStatus(status);};
    if (targetPage === "guest-home") setUser({ role: "guest" });
    if (targetPage === "user-home") setUser({ role: "user" });
    if (targetPage === "register") setSelectedEventId(eventId);
  };
  
  const redirectTo = (path) => {
    window.location.href = `/${path}`;
  };

  const routes = [
    {
      path: "/",
      component: Login,
    },
    {
      path: "/my-passes",
      component: MyPasses,
    },
    {
      path: "/user-home",
      component: UserHome,
    },
    {
      path: "/guest-home",
      component: GuestHome,
    },
    {
      path: "/admin-home",
      component: AdminHome,
    },
    {
      path: "/register",
      component: Registration,
    },
  ];

  return (
    <div>
      {page === "login" && <Login setUser={setUser} navigateTo={navigateTo} />}
      {page === "home" && <Home user={user} setPasses={setPasses} navigateTo={navigateTo} />}
       {page === "register" && <Registration user={user} setPasses={setPasses} selectedEventId={selectedEventId} navigateTo={navigateTo} />} 
      {page === "registration" && (
        <Registration
          user={user}
          setPasses={setPasses}
          selectedEventId={selectedEventId}
          navigateTo={navigateTo}
        />
      )}
      {page === "active-passes" && <Ticket passes={passes} updatePasses={setPasses} navigateTo={navigateTo} eventId={selectedEventId} selectedStatus={"active"}/>}
      {page === "cancelled-passes" && <Ticket passes={passes} updatePasses={setPasses} navigateTo={navigateTo} eventId={selectedEventId} selectedStatus={"cancelled"}/>}
      {page === "past-passes" && <Ticket passes={passes} updatePasses={setPasses} navigateTo={navigateTo} eventId={selectedEventId} selectedStatus={"complete"}/>}
      {user && user.role === "admin" && <AdminHome user={user} setPasses={setPasses} navigateTo={redirectTo} />}
      {page === "guest-home" && <GuestHome user={user} navigateTo={navigateTo} />}
      {page === "user-home" && <UserHome user={user} navigateTo={navigateTo} />}
      {page === "my-passes" && <Ticket passes={myPassData} updatePasses={setPasses} navigateTo={navigateTo} eventId={selectedEventId} selectedStatus={selectedStatus} />}
    </div>
  );
}

export default App;
