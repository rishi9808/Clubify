import React, { useState, useEffect } from "react";
import fetcher from "../utils/fetcher";
import { useParams } from "react-router-dom";
import { useLoginState } from "../state/slices/loginSlice";

const Participants = () => {
  const { eventId } = useParams();
  const [participants, setParticipants] = useState([]);
  const [eventDetails, setEventDetails] = useState(null);

  const clubAdmins = eventDetails?.club ? eventDetails?.club.admins : [];
  const { user } = useLoginState();
  const isClubAdmin = clubAdmins.includes(user?._id) || user?.superAdmin;

  const getParticipants = async () => {
    const response = await fetcher(`api/event/${eventId}/participants`, {
      method: "GET",
    });

    if (response.status === 200) {
      const data = await response.json();
      setParticipants(data);
    }
  };

  const getEventDetails = async () => {
    const response = await fetcher(`api/event/${eventId}`, {
      method: "GET",
    });

    if (response.status === 200) {
      const data = await response.json();
      setEventDetails(data);
    }
  };

  const handleRemove = async (user) => {
    const response = await fetcher(`api/event/${eventId}/participants`, {
      method: "DELETE",
      body: JSON.stringify({ participant: user._id }),
    });

    if (response.status === 200) {
      alert(`${user.name} has been removed from this event`);
      getParticipants();
    }
  };

  useEffect(() => {
    getParticipants();
    getEventDetails();
  }, []);

  return (
    eventDetails && (
      <div className="flex flex-col justify-center text-center items-center bg-blue-100 m-2">
        <h2 className="text-xl uppercase  text-2xl m-2 p-2 ">
          {eventDetails.club.name} presents {eventDetails.name}
          <p> Below are the list of all this participants</p>
        </h2>
        {participants &&
          participants.map((user, index) => (
            <div key={index} className="m-2">
              <div>
                <span className="mr-4">Name: {user.name}</span>
                <span className="mr-4">Email: {user.email}</span>
                {isClubAdmin && (
                  <button
                    className="m-2 py-2 px-1 border-2 rounded-lg uppercase bg-blue-200"
                    onClick={() => handleRemove(user)}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
    )
  );
};

export default Participants;
