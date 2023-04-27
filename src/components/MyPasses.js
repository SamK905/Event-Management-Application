import React, { useState } from "react";
import EventDetails from "../EventDetails";
import { eventData } from "../data/eventData";

const ReturnHome = ({ navigateTo }) => (
  <div className="home">
    <button onClick={() => navigateTo("user-home")}>Home</button>
  </div>
);
const MyPasses = ({
  passes,
  updatePasses,
  navigateTo,
  eventId,
  selectedStatus,
}) => {
  console.log('passes:', passes);
  console.log('selectedStatus:', selectedStatus);
  
  let filteredPasses = passes;
  if(selectedStatus === "active") {
    filteredPasses = passes.filter((pass) => pass.status === "active");
  } else if(selectedStatus === "cancelled") {
    filteredPasses = passes.filter((pass) => pass.status === "cancelled");
  }

  const handleCancel = (pass) => {
    console.log('passes before update:', passes);
  
    updatePasses(
      passes.map((p) => {
        if (p.id === pass.id) {
          console.log('cancelling pass:', pass);
          return { ...p, status: "cancelled" };
        }
        return p;
      })
    );
  
    console.log('passes after update:', passes);
  };

  return (
    <>
      <ReturnHome navigateTo={navigateTo} />
      <div className="my-passes">
        {/* <h2>{selectedStatus === "active" ? "Registered Passes" : "Cancelled Passes"}</h2> */}
        {filteredPasses.length === 0 && <p>No {selectedStatus === "active" ? "registered" : "cancelled"} passes.</p>}
        {filteredPasses.map((pass) => {
          return (
            <div key={pass.id}>
              <p>Pass ID: {pass.id}</p>
              <p>Event ID: {pass.eventId}</p>
              <p>Number of Adults: {pass.numAdults}</p>
              <p>Number of Children: {pass.numChildren}</p>
              <p>Status: {pass.status}</p>
              <button onClick={() => handleCancel(pass)}>Cancel Pass</button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MyPasses;
