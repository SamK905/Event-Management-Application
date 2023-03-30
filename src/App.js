import React, { useState } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Registration from "./components/Registration";
import MyPasses from "./components/MyPasses";
import myPassData from "./data/myPassData";

function App() {
  const [user, setUser] = useState(null);
  const [passes, setPasses] = useState([]);
  const [page, setPage] = useState("login");
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const navigateTo = (targetPage, eventId) => {
    setPage(targetPage);
    if (eventId) setSelectedEventId(eventId);
    if (targetPage === "my-passes") setSelectedUser(user);
  };

  return (
    <div>
      {page === "login" && <Login setUser={setUser} navigateTo={navigateTo} />}
      {page === "home" && <Home user={user} setPasses={setPasses} navigateTo={navigateTo} />}
      {page === "register" && <Registration user={user} setPasses={setPasses} selectedEventId={selectedEventId} navigateTo={navigateTo} />}
      {page === "my-passes" && <MyPasses passes={myPassData} updatePasses={setPasses} navigateTo={navigateTo} eventId={selectedEventId} />}
    </div>
  );
}

export default App;
