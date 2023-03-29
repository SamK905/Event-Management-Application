import React, { useState } from "react";
import EventDetails from "./EventDetails";
import myPassData from "../data/myPassData";

const ReturnHome = ({ navigateTo }) => (
  <div className="home">
    <button onClick={() => navigateTo("home")}>Home</button>
  </div>
);

const MyPasses = ({ navigateTo }) => {
  const [passes, setPasses] = useState(myPassData);

  const handleCancel = (pass) => {
    setPasses(
      passes.map((p) => {
        if (p.id === pass.id) {
          return { ...p, status: "cancelled" };
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
        {registeredPasses.map((pass) => (
          <EventDetails key={pass.id} event={pass.event} paymentInfo={pass.paymentInfo} onCancel={handleCancel} />
        ))}

        <h2>My Cancelled Passes</h2>
        {cancelledPasses.length === 0 && <p>No cancelled passes.</p>}
        {cancelledPasses.map((pass) => (
          <EventDetails key={pass.id} event={pass.event} paymentInfo={pass.paymentInfo} />
        ))}
      </div>
    </>
  );
};

export default MyPasses;
