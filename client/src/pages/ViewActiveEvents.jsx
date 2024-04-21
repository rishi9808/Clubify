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
      <div className="min-h-screen flex w-full justify-center bg-gray-100">
        <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 m-auto rounded-3xl mt-5 w-3/4 max-w-4xl">
          <div>
            <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
              <h1>Active Events</h1>
            </div>
            <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
              Below are active events, participate now and win exciting prizes!!
            </div>
            <div className="flex flex-wrap bg-gray-100 w-full p-2 py-8 rounded-xl mt-5">
              {eventDetails.map((event) => (
                <div
                  className="overflow-hidden shadow-lg rounded-lg h-72 py-2 w-52 cursor-pointer m-auto"
                  key={event._id}
                >
                  <img
                    alt="event photo"
                    src="/images/events.svg"
                    className="max-h-40 w-full object-cover bg-white"
                  />
                  <div className="bg-white dark:bg-gray-800 w-full p-4">
                    <p className="text-indigo-500 text-sm font-medium">
                      {console.log(event.club?.name)}
                      {/* problem why how clubs */}
                    </p>
                    <p className="text-gray-800 dark:text-white text-lg font-medium mb-2">
                      {event.name}
                    </p>
                    <p className="text-gray-400 dark:text-gray-300 text-sm">
                      {event.description}
                    </p>
                    <div className="flex items-center mt-4">
                      <button
                        className="uppercase rounded-lg py-2 px-4 bg-gray-800 border-2 border-transparent text-white text-base mr-4 hover:bg-gray-900"
                        onClick={() => handleView(event._id)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ViewActiveEvents;
