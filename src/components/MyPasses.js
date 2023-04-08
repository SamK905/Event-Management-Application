import React, { useState } from "react";
import EventDetails from "./EventDetails";
import { eventData } from "../data/eventData";

const ReturnHome = ({ navigateTo }) => (
  <div className="home">
    <button onClick={() => navigateTo("home")}>Home</button>
  </div>
);

const MyPasses = ({ passes, updatePasses, navigateTo }) => {
  const handleCancel = (pass) => {
    updatePasses(
      passes.map((p) => {
        if (p.id === pass.id) {
          console.log({ ...p, status: "cancelled" });
        }
        return p;
      })
    );
  };

  const registeredPasses = passes.filter((pass) => pass.status === "active");
  const cancelledPasses = passes.filter((pass) => pass.status === "cancelled");

  return (
    <>
      <ReturnHome navigateTo={navigateTo} />
      <div className="my-passes">
        <h2>My Registered Passes</h2>
        {registeredPasses.length === 0 && <p>No registered passes.</p>}
        {registeredPasses.map((pass) => {
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

        <h2>My Cancelled Passes</h2>
        {cancelledPasses.length === 0 && <p>No cancelled passes.</p>}
        {cancelledPasses.map((pass) => {
          return (
            <div key={pass.id}>
              <p>Pass ID: {pass.id}</p>
              <p>Event ID: {pass.eventId}</p>
              <p>Status: {pass.status}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MyPasses;
