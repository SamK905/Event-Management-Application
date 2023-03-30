import React, { useState } from "react";
import loginData from "../data/loginData"; // Import loginData

function Login({ setUser, navigateTo }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Add this line for displaying error messages

  const handleLogin = (role) => {
    const user = loginData.find(
      (user) =>
        user.username === username &&
        user.password === password &&
        user.role === role
    );

    if (user) {
      setUser({ username, role });
      navigateTo("home");
    } else {
      setErrorMessage("Invalid username or password.");
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      {errorMessage && <p className="error">{errorMessage}</p>} {/* Display error messages */}
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

export default Login;
