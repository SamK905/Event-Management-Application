
const EventPassNavigation = ({ event, navigateTo, setSelectedEventId }) => (
    <div className='pass-nav'>
      {event ? (
        <>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <button
            onClick={() => {
              setSelectedEventId(event.id); // Set the selected event ID
              navigateTo("my-passes");
            }}
          >
            My Passes
          </button>
        </>
      ) : (
        <h3>No event pass available!</h3>
      )}
    </div>
  );
  
export default EventPassNavigation;