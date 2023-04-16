import React from 'react';
import "../Logout.css";

const Logout = ({ onLogout }) => {
  return (
    <div className="logout-container">
      <button className="logout-button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
