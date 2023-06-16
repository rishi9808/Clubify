import React, { useState, useEffect } from "react";
import fetcher from "../utils/fetcher";
import { useNavigate } from "react-router-dom";

const ViewActiveEvents = () => {
  const navigate = useNavigate();
  const [eventDetails, setEventDetails] = useState(null);

  const getEventDetails = async () => {
    const response = await fetcher("api/event/", {
      method: "GET",
    });

    if (response.status === 200) {
      const data = await response.json();
      setEventDetails(data);
    }
  };

  const handleView = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  useEffect(() => {
    getEventDetails();
  }, []);
  return (
    eventDetails && (
      <div>
        <h1>Active Events</h1>
        {eventDetails.map((event) => (
          <div className="flex" key={event._id}>
            <div>{event.name}</div>
            <button
              className="btn btn-primary"
              onClick={() => handleView(event._id)}
            >
              View Event
            </button>
          </div>
        ))}
      </div>
    )
  );
};

export default ViewActiveEvents;
