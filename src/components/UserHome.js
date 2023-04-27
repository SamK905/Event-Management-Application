import React, { useState } from 'react';
import { eventData } from "../data/eventData";
import myPassData from "../data/myPassData";
import "../UserHome.css";
import Logout from './Logout';
import { slide as Menu } from 'react-burger-menu';
import "../Navbar.css";

const UserHome = ({ user, setPasses, navigateTo }) => {
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [filter, setFilter] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleRegisterClick = (eventId) => {
    setSelectedEventId(eventId);
    navigateTo("registration",eventId);
  };  
  
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredEvents = () => {
    let filtered = [...eventData];

    if (filter === "month") {
      const currentMonth = new Date().getMonth();
      filtered = filtered.filter(
        (event) => new Date(event.date).getMonth() === currentMonth
      );
    }

    if (filter === "newest") {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    if (filter === "past") {
      filtered = filtered.filter(
        (event) => new Date(event.date) < new Date()
      );
    }

    return filtered;
  };

  const handleLogout = () => {
    console.log('User has logged out');
    navigateTo("login");
  };

  const renderFilterDropdown = () => {
    return (
      <div style={{ paddingLeft: '534px',paddingTop: '6px'}}>
        <label htmlFor="filter">Filter events:</label>
        <select id="filter" value={filter} onChange={handleFilterChange}>
          <option value="">--Select filter--</option>
          <option value="newest">Newest</option>
          <option value="month">This Month</option>
          <option value="past">Past</option>
        </select>
        <br></br>
        <br></br>
      </div>      
    );
  };

  const renderEventFlashCards = () => {
    return (
      <div class="wrapper" id="flex-container">
    {filteredEvents().map((item) => {
    return(
      <div>
    <div class="product-img" id="flex-auto">
      <img src={item.url} height="300" width="270"/>
    </div>
    <div class="product-info" id="flex-initial">
      <div class="product-text">
        <h1>{item.name}</h1>
        <p>{item.description}</p>
      </div>

      <div style={{marginTop:'-155px',marginLeft:'37px'}}>
        <p>Event date: {item.date}</p>
        <p>Location: {item.location}</p>
        <p>Time:{item.time}</p>
      </div>

      <div class="product-price-btn">
        <p><span>{item.registrationFee}</span>$</p>
        <button type="button" onClick={() => handleRegisterClick(item.id)}>
          Register Now
        </button>
      </div>
    </div>
    </div>
    )})}
  </div>
    );
  };
  
  const HamburgerMenu = () => {
    return (
      <Menu
        left
        isOpen={menuOpen}
        onStateChange={({ isOpen }) => setMenuOpen(isOpen)}
        width={"250px"}
        customBurgerIcon={<img src={`${process.env.PUBLIC_URL}/hamburger-icon.png`} alt="Menu" style={{ width: '20px', height: '20px' }} />}
        customCrossIcon={false}
        styles={{
          bmBurgerButton: {
            display: 'none'
          },
          bmMenu: {
            background: '#333',
            padding: '2.5em 1.5em 0',
            fontSize: '1.15em'
          },
          bmMorphShape: {
            fill: '#373a47'
          },
          bmItemList: {
            color: '#b8b7ad',
            padding: '0.8em'
          },
          bmOverlay: {
            background: 'rgba(0, 0, 0, 0.3)'
          },
          bmItem: {
            display: 'block',
            padding: '0.5rem 1rem',
            color: '#fff',
            fontSize: '1.2rem',
            transition: 'background-color 0.3s ease',
          },
          bmItemHover: {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          },
          bmItemActive: {
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
          },
        }}
      >
       <a
          className="menu-item"
          onClick={() => navigateTo("active-passes", "","active")}
        >
          Registered Passes
        </a>
        <a
          className="menu-item"
          onClick={() => navigateTo("cancelled-passes", "", "cancelled")}
        >
          Cancelled Passes
        </a>

        <a
          className="menu-item"
          onClick={() => navigateTo("past-passes", "", "complete")}
        >
          Past Passes
        </a>

        <a className="menu-item" onClick={handleLogout}>
          Logout
        </a>
      </Menu>

    );
  };
  

  const handleMenuButtonClick = () => {
    setMenuOpen(!menuOpen);
  };

  const renderMenuButton = () => (
    <button onClick={handleMenuButtonClick} className="hamburger-menu-button">
      <img
        src={`${process.env.PUBLIC_URL}/hamburger-icon.png`}
        alt="Menu"
        style={{ width: '20px', height: '20px' }}
      />
    </button>
  );

  return (
    <>
    <ul style={{background:'#0F1111'}}>
    <li style={{float:'left' }}><a><strong>Events</strong></a></li>
    <ul className="navbar">
      <li className="nav-item">
        <a className="nav-link" onClick={() => navigateTo("login")}>
          Logout
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" onClick={() => navigateTo("active-passes")}>
          My Passes
        </a>
      </li>
    </ul>
    </ul>
      <div style={{ paddingLeft: menuOpen ? "250px" : "0" }}>
        {renderFilterDropdown()}
        
        {renderEventFlashCards()}   
      </div>    
    </>
  );
};

export default UserHome;
