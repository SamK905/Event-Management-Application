import React, { useState } from "react";
import { eventData } from "../data/eventData";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { GuestDashboard } from "./GuestDashboard";
import "../GuestDashboard.css";
import "../AdminDashboard.css";

const AdminDashboard = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [events, setEvents] = useState(eventData);
  const [newEvent, setNewEvent] = useState({
    id: "",
    name: "",
    description: "",
    location: "",
    time: "",
    date: "",
    registrationFee: "",
    title: "",
  });
  const [filter, setFilter] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventId = events.length + 1;
    setEvents([...events, { ...newEvent, id: eventId }]);
    setNewEvent({
      id: "",
      name: "",
      description: "",
      location: "",
      time: "",
      date: "",
      registrationFee: "",
      title: "",
    });
  };

  const renderCreateEvent = () => {
    return (
      <div>
        <h3>Create Event</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Event Name"
            value={newEvent.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Event Description"
            value={newEvent.description}
            onChange={handleChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Event Location"
            value={newEvent.location}
            onChange={handleChange}
          />
          <input
            type="time"
            name="time"
            placeholder="Event Time"
            value={newEvent.time}
            onChange={handleChange}
          />
          <input
            type="date"
            name="date"
            placeholder="Event Date"
            value={newEvent.date}
            onChange={handleChange}
          />
          <input
            type="number"
            name="registrationFee"
            placeholder="Event Registration Fee"
            value={newEvent.registrationFee}
            onChange={handleChange}
          />
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={handleChange}
          />
          <button type="submit">Create Event</button>
        </form>
      </div>
    );
  };  

  
  const filteredEvents = () => {
    let filtered = [...events];

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

  const renderFilterDropdown = () => {
    return (
      <div>
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
  
  const renderOption = () => {
    switch (selectedOption) {
      case "create":
        return renderCreateEvent();
      case "view":
        return (<>
            {renderFilterDropdown()}
            <div className="flash-cards-container">
                {filteredEvents().map((event) => (
                <div key={event.id} className="flash-card">
                    <img src={event.image} alt={event.name} />
                    <div className="flash-card-content">
                    <h3>{event.name}</h3>
                    <p>{event.location}</p>
                    <button>Edit Event</button>
                    </div>
                </div>
                ))}
            </div>
            </>
        );
      default:
        return null;
    }
  };
  

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div className="button-container">
        <button className="awesome-button" onClick={() => setSelectedOption("create")}>
          Create Event
        </button>
        <button className="awesome-button" onClick={() => setSelectedOption("view")}>
          View Event
        </button>
      </div>
      {renderOption()}
    </div>
  );
};

export default AdminDashboard;
