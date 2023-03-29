import React, { useState } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Registration from "./components/Registration";
import MyPasses from "./components/MyPasses";

function App() {
  const [user, setUser] = useState(null);
  const [passes, setPasses] = useState([]);
  const [page, setPage] = useState("login");
  const [selectedEventId, setSelectedEventId] = useState(null);

  const navigateTo = (targetPage, eventId) => {
    setPage(targetPage);
    if (eventId) setSelectedEventId(eventId);
  };

  return (
    <div>
      {page === "login" && <Login setUser={setUser} navigateTo={navigateTo} />}
      {page === "home" && <Home user={user} setPasses={setPasses} navigateTo={navigateTo} />}
      {page === "register" && <Registration user={user} setPasses={setPasses} selectedEventId={selectedEventId} />}
      {page === "my-passes" && <MyPasses passes={passes} setPasses={setPasses} navigateTo={navigateTo} />}
    </div>
  );
}

export default App;
