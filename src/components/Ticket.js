import React,{useState,useEffect} from 'react';
import ReactToPrint from 'react-to-print';
import EventDetails from "../EventDetails";
import { eventData } from "../data/eventData";
import './Ticket.css';
const thStyle = {
    fontFamily: "Anton",
    fontWeight: "normal",
    fontStyle: "normal"
};

const color=""
const ReturnHome = ({ navigateTo }) => (
    <span style={{ width: '100%',backgroundColor: 'black', display: 'flex', flexDirection : 'row-reverse', height:'46px'}}>
      <button style={{marginTop:'8px', marginBottom:'11px', marginRight:'10px'}} onClick={() => navigateTo("user-home")}>Home</button>
    </span>
  );

  const ActivePass = ({ navigateTo }) => (
    <span className="home">
      <button onClick={() => navigateTo("active-passes")}>Active Passes</button>
    </span>
  );

  const CancelledPass = ({ navigateTo }) => (
    <span className="home">
      <button onClick={() => navigateTo("cancelled-passes")}>Cancelled Passes</button>
    </span>
  );

  const PastPass = ({ navigateTo }) => (
    <span className="home">
      <button onClick={() => navigateTo("past-passes")}>Past Passes</button>
    </span>
  );

  const Ticket = ({
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
    } else if(selectedStatus === "complete") {
        filteredPasses = passes.filter((pass) => pass.status === "complete");
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
        <ReturnHome style={{}} navigateTo={navigateTo} />
        <div style={{display:'flex', justifyContent:'space-around ', marginTop:'20px'}}>
        <ActivePass navigateTo={navigateTo} />
        <CancelledPass navigateTo={navigateTo} />
        <PastPass navigateTo={navigateTo} />
        </div>
        {/* <div className="my-passes"> */}
        <center><h2>{selectedStatus === "active" ? "Registered Passes" : (selectedStatus === "cancelled" ?"Cancelled Passes":"Past pasees")}</h2></center>
          {filteredPasses.length === 0 && <p>No {selectedStatus === "active" ? "registered" : (selectedStatus === "cancelled" ?"cancelled ":"past")} passes.</p>}
          {filteredPasses.map((pass) => {
            return (
                <div className="row" key={pass.id}>
                <article className="card fl-left">
                  <section className="date">
                    <time datetime={""}>
                      <span>{pass.eventTitle}</span>
                      {/* <span>April</span> */}
                    </time>
                  </section>
                  <section className="card-cont">
                    <small>{pass.eventDescription}</small>
                    <div><small> Event Id: {pass.id}</small></div>
                    <div>Number of Adults:{pass.numAdults}</div>
                    <div>Number of Children:{pass.numChildren}</div>
                    Status:  <span style={{backgroundColor:pass.status==="active"?"#5af84c": pass.status=='cancelled'?'red':"#ffd311", color:'white'}}>{pass.status}</span>
                    
                    {/* {pass.status === "active"?"": <a style={{backgroundColor:'#5af84c'}}>Cancelled</a>} */}
                  </section>
                  {pass.status === "active"?
                    <button style={{backgroundColor:'red',marginLeft:'503px', marginBottom:'5px'}} ype='submit' onClick={() => handleCancel(pass)}>Cancel Pass</button>
                    :""}
                </article>
                </div>
            );
          })}
      </>
    );
  };
export default Ticket;