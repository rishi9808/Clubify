import React, { useEffect, useState } from "react";
import { Forms } from "../components/Forms";
import fetcher from "../utils/fetcher";
import { useNavigate, useParams } from "react-router-dom";

const UpdateEvent = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const clubId = eventDetails?.club._id;

  const updateEventInputs = [
    {
      name: "name",
      type: "text",
      label: "Event name",
      defaultValue: eventDetails?.name,
    },
    {
      name: "description",
      type: "text",
      label: "Description",
      defaultValue: eventDetails?.description,
    },
    {
      name: "eventType",
      type: "text",
      label: "Event Type",
      defaultValue: eventDetails?.details?.eventType,
    },
    {
      name: "registrationFee",
      type: "text",
      label: "Free",
      defaultValue: eventDetails?.details?.registrationFee,
    },
    {
      name: "registrationStart",
      type: "date",
      label: "Registration Start Date",
      defaultValue: eventDetails?.dates?.registrationStart,
    },
    {
      name: "start",
      type: "date",
      label: "Event Start Date",
      defaultValue: eventDetails?.dates?.start,
    },
    {
      name: "end",
      type: "date",
      label: "Event End Date",
      defaultValue: eventDetails?.dates?.end,
    },
    {
      name: "result",
      type: "date",
      label: "Event Result Date",
      defaultValue: eventDetails?.dates?.result,
    },
  ];

  async function updateEvent(formData) {
    const transformedData = transformFomData(formData);

    const response = await fetcher(`api/event/${eventId}`, {
      method: "POST",
      body: JSON.stringify({ ...transformedData, club: clubId }),
    });

    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
      alert("Successfully updated Event");

      navigate(-1);
    }
  }

  const getEventDetails = async () => {
    const response = await fetcher(`api/event/${eventId}`, {
      method: "GET",
    });

    if (response.status === 200) {
      const data = await response.json();
      setEventDetails(data);
    }
  };

  useEffect(() => {
    getEventDetails();
  }, []);

  return eventDetails ? (
    <div className="flex flex-col justify-center items-center m-2">
      <h1 className="text-xl uppercase">Update {eventDetails.name} </h1>
      <Forms inputs={updateEventInputs} onSubmit={updateEvent} />
    </div>
  ) : (
    <></>
  );
};

export default UpdateEvent;

const transformFomData = ({
  name,
  description,
  start,
  end,
  registrationStart,
  result,
  type,
  isFreeEvent,
  participationType,
  prizes,
  participants,
}) => {
  return {
    name,
    description,
    details: {
      type,
      isFreeEvent,
      participationType,
    },
    dates: {
      start,
      end,
      registrationStart,
      result,
    },
    prizes: prizes || [],
    participants: participants || [],
  };
};
