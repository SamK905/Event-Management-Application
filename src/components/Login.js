import React, { useState } from "react";

function Login({ setUser, navigateTo }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (role) => {
    setUser({ username, role });
    navigateTo("home");
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flash-cards">
        <button className="user-card" onClick={() => handleLogin("user")}>
          <h3>User Login</h3>
          <p>Register for events and manage passes</p>
        </button>
        <button className="admin-card" onClick={() => handleLogin("admin")}>
          <h3>Admin Login</h3>
          <p>Manage events and users</p>
        </button>
      </div>
      <button className="guest-card" onClick={() => handleLogin("guest")}>
          <h3>Guest View</h3>
          <p>Access limited event details</p>
      </button>
    </div>
  );
}

export default Login
