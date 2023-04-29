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
    <div class="login-form">
  <form>
    <h1>Event management Portal</h1>
    <div class="content">
      <div class="input-field">
      <input
            type="text"
            placeholder="Username"
            value={userUsername}
            onChange={(e) => setUserUsername(e.target.value)}/>
      </div>
      <div class="input-field">
      <input
            type="password"
            placeholder="Password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}/>        
      </div>
      <a href="" style={{textDecoration:'underline'}} className="link">Forgot Your Password?</a>
      {/* <a href="" className="link" onClick={() => handleGuestLogin()}>Browse as guest</a> */}

    </div>
    <div className="action">
    <button onClick={() =>{}}>Signup</button>
    <button onClick={() => handleLogin("user")}>Login</button>
    </div>
  </form>
</div>
  );
}

export default Login;
