import React, { useState } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Registration from "./components/Registration";
import MyPasses from "./components/MyPasses";
import AdminHome from "./components/AdminHome";
import myPassData from "./data/myPassData";
import UserHome from "./components/UserHome";
import GuestHome from "./components/GuestHome";
import './App.css';
import GuestDashboard from "./components/GuestDashboard";

function App() {
  const [user, setUser] = useState(null);
  const [passes, setPasses] = useState([]);
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
  ];

  return (
    <div>
      {page === "login" && <Login setUser={setUser} navigateTo={navigateTo} />}
      {page === "home" && <Home user={user} setPasses={setPasses} navigateTo={navigateTo} />}
      {page === "register" && <Registration user={user} setPasses={setPasses} selectedEventId={selectedEventId} navigateTo={navigateTo} />}
      {page === "my-passes" && <MyPasses passes={myPassData} updatePasses={setPasses} navigateTo={navigateTo} eventId={selectedEventId} selectedStatus={selectedStatus}/>}
      {user && user.role === "admin" && <AdminHome user={user} setPasses={setPasses} navigateTo={redirectTo} />}
      {page === "guest-home" && <GuestHome user={user} navigateTo={navigateTo} />}
      {page === "user-home" && <UserHome user={user} navigateTo={navigateTo} />}
    </div>
  );
}

export default App;
