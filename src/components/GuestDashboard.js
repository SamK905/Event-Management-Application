import React, { useState } from "react";
import { eventData } from "../data/eventData";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import myPassData from "../data/myPassData";
import "../GuestDashboard.css";

const GuestDashboard = ({ navigateTo }) => {
  const [passId, setPassId] = useState("");
  const [passFound, setPassFound] = useState(false);
  const [eventPass, setEventPass] = useState(null);
  const [filter, setFilter] = useState("");

  const handleInputChange = (e) => {
    setPassId(e.target.value);
  };

  const findPass = () => {
    const foundPass = myPassData.find((pass) => pass.id.toString() === passId);
    if (foundPass) {
      setPassFound(true);
      setEventPass(foundPass);
    } else {
      setPassFound(false);
    }
  };

  const downloadPDF = () => {
    const event = eventData.find((event) => event.id === eventPass.eventId);
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Event Pass", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Pass ID", "Event", "Name", "Email", "Status"]],
      body: [
        [
          eventPass.id,
          event.name,
          eventPass.name,
          eventPass.email,
          eventPass.status,
        ],
      ],
    });

    doc.save("event-pass.pdf");
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

    return filtered;
  };

  const handleLogin = () => {
    navigateTo("login");
  }

  return (
    <div>
      <h2>Guest Dashboard</h2>
      <div>
        <h3>Event Filters</h3>
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="">Select filter</option>
          <option value="month">Current Month</option>
          <option value="newest">Newest</option>
        </select>
      </div>
      <div className="flash-cards-container">
        {filteredEvents().map((event) => (
          <div key={event.id} className="flash-card">
            <div className="flash-card-content">
              <h3>{event.name}</h3>
              <p>{event.location}</p>
              <button onClick={handleLogin}>Login To Register</button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <h3>Retrieve Event Pass</h3>
        <input
          type="text"
          placeholder="Enter Pass ID"
          value={passId}
          onChange={handleInputChange}
        />
        <button onClick={findPass}>Find Pass</button>
        {passFound && (
          <>
            <p>Pass found! Click the button below to download your pass.</p>
            <button onClick={downloadPDF}>Download Pass as PDF</button>
          </>
        )}
      </div>
    </div>
  );
};

export default GuestDashboard;
