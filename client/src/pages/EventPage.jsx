import React, { useEffect, useState } from "react";
import fetcher from "../utils/fetcher";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useLoginState } from "../state/slices/loginSlice";
import { DateTime } from "luxon";

const EventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [eventDetails, setEventDetails] = useState(null);

  const clubAdmins = eventDetails?.club ? eventDetails?.club.admins : [];
  const { user } = useLoginState();
  const isParticipant = eventDetails?.participants?.includes(user?._id);

  const isClubAdmin = clubAdmins.includes(user?._id) || user?.superAdmin;
  const clubId = eventDetails?.club._id;

  const today = DateTime.now();
  const eventStart = DateTime.fromJSDate(new Date(eventDetails?.dates?.start));
  const eventEnd = DateTime.fromJSDate(new Date(eventDetails?.dates?.end));

  const RegistrationStart = DateTime.fromJSDate(
    new Date(eventDetails?.dates?.registrationStart)
  );

  const registrationStarted = today >= RegistrationStart;
  const eventStarted = today >= eventStart;
  const eventEnded = today >= eventEnd;

  const handleUpdate = () => {
    navigate(`/event/${eventId}/update`);
  };

  const handleDelete = async () => {
    const response = await fetcher(`api/event/${eventId}`, {
      method: "DELETE",
    });

    if (response.status === 200) {
      alert("Successfully deleted");
    }
    navigate(`/club/${clubId}`);
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

  const handleRegister = async () => {
    const response = await fetcher(`api/event/${eventId}/register`, {
      method: "POST",
    });
    if (response.status === 200) {
      alert("You have Successfully registered for the event");
      getEventDetails();
    }
  };

  const handleLeave = async (user) => {
    const response = await fetcher(`api/event/${eventId}/participants`, {
      method: "DELETE",
      body: JSON.stringify({ participant: user._id }),
    });

    if (response.status === 200) {
      alert("You have withdrawn from this event");
      getEventDetails();
    }
  };

  const handleViewParticipants = async () => {
    navigate(`/event/${eventId}/participants`);
  };

  useEffect(() => {
    getEventDetails();
  }, []);

  return eventDetails ? (
    <div className="flex flex-col justify-center items-center bg-blue-100 m-2">
      <h1 className="text-xl uppercase  text-2xl m-2 p-2 ">
        {eventDetails.club.name} presents {eventDetails.name}
      </h1>

      <p>
        The event {eventDetails.description}
        <br />
        It is a {eventDetails.type} event and registration fee is{" "}
        {eventDetails.details.registrationFee}
      </p>

      {eventDetails.prizes.length > 0 && (
        <div>
          <h5>Prizes</h5>
          {eventDetails.prizes.map((prize, idx) => (
            <div key={idx} className="m-2">
              <span>Type : {prize.type}</span> <br />
              <span>Amount : {prize.amount}</span>
              <br />
              <span>Winner : {prize.winner.name}</span>
            </div>
          ))}
        </div>
      )}
      {eventEnded ? (
        <span>Event has ended</span>
      ) : eventStarted ? (
        <span>Event has started</span>
      ) : registrationStarted ? (
        isParticipant ? (
          <div>
            <span>You are already registered</span>{" "}
            <button
              className="m-2 py-2 px-1 border-2 rounded-lg uppercase bg-blue-200"
              onClick={() => handleLeave(user)}
            >
              Leave
            </button>
          </div>
        ) : (
          <button
            className="m-2 py-2 px-1 border-2 rounded-lg uppercase bg-blue-200"
            onClick={handleRegister}
          >
            Register
          </button>
        )
      ) : (
        <span>Registration not open yet, come back later</span>
      )}

      <button
        className="m-2 py-2 px-1 border-2 rounded-lg uppercase bg-blue-200"
        onClick={handleViewParticipants}
      >
        Show Participants
      </button>

      {isClubAdmin ? (
        <div>
          <button
            className="m-2 py-2 px-1 border-2 rounded-lg uppercase bg-blue-200"
            onClick={handleUpdate}
          >
            Update Details
          </button>

          <button
            className=" m-2 py-2 px-1 border-2 rounded-lg uppercase bg-blue-200"
            onClick={handleDelete}
          >
            Delete Event
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  ) : (
    <div></div>
  );
};

export default EventPage;
