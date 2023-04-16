import React, { useState } from "react";
import loginData from "../data/loginData";
import UserHome from "./UserHome";
import GuestHome from "./GuestHome";
import AdminHome from "./AdminHome";

function Login({ setUser, navigateTo }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [userUsername, setUserUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const handleLogin = (role) => {
    const username = role === "user" ? userUsername : adminUsername;
    const password = role === "user" ? userPassword : adminPassword;
    const user = loginData.find((user) => user.username === username && user.password === password && user.role === role);
    if (user) {
      setUser(user);
      setUser({ role });
      switch (role) {
        case "user":
          navigateTo("user-home");
          break;
        case "guest":
          navigateTo("guest-home");
          break;
        case "admin":
          navigateTo("admin-home");
          break;
        default:
          break;
      }
    } else {
      setErrorMessage("Invalid username or password");
    }
  };  

  const handleGuestLogin = () => {
    navigateTo("guest-home");
  }

  return (
    <div className="login">
      <h2>Login</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <div className="flash-cards-container">
        <div className="flash-card user-card">
          <h3>User Login</h3>
          <input
            type="text"
            placeholder="Username"
            value={userUsername}
            onChange={(e) => setUserUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
          <button onClick={() => handleLogin("user")}>Login</button>
          <p>Register for events and manage passes</p>
        </div>
        <div className="flash-card admin-card">
          <h3>Admin Login</h3>
          <input
            type="text"
            placeholder="Username"
            value={adminUsername}
            onChange={(e) => setAdminUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
          />
          <button onClick={() => handleLogin("admin")}>Login</button>
          <p>Manage events and users</p>
        </div>
        <button className="flash-card guest-card" onClick={() => handleGuestLogin()}>
          <h3>Guest View</h3>
          <p>Access limited event details</p>
        </button>
      </div>
    </div>
  );
}

export default Login;
