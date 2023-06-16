import React, { useState, useEffect } from "react";
import fetcher from "../utils/fetcher";
import { useParams , useNavigate } from "react-router-dom";
import { useLoginState } from "../state/slices/loginSlice";

const Participants = () => {
  const navigate = useNavigate();
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
      <div className="min-h-screen flex flex-col items-center w-full bg-gray-100">
        <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl mt-5 w-full max-w-5xl">
          <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
            {eventDetails.club.name} presents {eventDetails.name}
          </div>
          {participants.length > 0 ? (
            <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
              Below are the list of all participants
            </div>
          ) : (
            <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
              This event has no participants yet
            </div>
          )}
          {participants &&
            participants.map((user, index) => (
              <div
                key={index}
                className="flex p-5 mt-8 space-x-4 items-center shadow-lg max-w-sm rounded-md"
              >
                <div className="flex">
                  <div>
                    <h2 className=" font-semibold text-lg">{user.name}</h2>
                    <p className="mt-1 text-gray-400 text-sm cursor-pointer">
                      {user.email}
                    </p>
                  </div>

                  {isClubAdmin && (
                    <>
                      <button
                        className="m-2 py-2 px-1 border-2 rounded-lg uppercase focus:outline-none text-white text-sm sm:text-base bg-gray-500 hover:bg-gray-600 rounded-lg  transition duration-150 ease-in"
                        onClick={() => handleRemove(user)}
                      >
                        Remove
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    )
  );
};

export default Participants;
