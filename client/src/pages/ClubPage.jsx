import React, { useEffect, useState } from "react";
import fetcher from "../utils/fetcher";
import { useNavigate, useParams } from "react-router-dom";
import { useLoginState } from "../state/slices/loginSlice";

const ClubPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [clubDetails, setClubDetails] = useState(null);

  const clubAdmins = clubDetails ? clubDetails.admins : [];
  const { user } = useLoginState();

  const isClubAdmin = clubAdmins.includes(user?._id) || user?.superAdmin;

  const handleUpdate = () => {
    navigate(`/club/${id}/update`);
  };

  const handleCreateEvent = () => {
    navigate(`/club/${id}/event`);
  };

  const handleDelete = async () => {
    const response = await fetcher(`api/club/${id}`, {
      method: "DELETE",
    });

    if (response.status === 200) {
      alert("Successfully deleted");
    }
    navigate("/club");
  };

  const getClubDetails = async () => {
    const response = await fetcher(`api/club/${id}`, {
      method: "GET",
    });

    if (response.status === 200) {
      const data = await response.json();
      setClubDetails(data);
    }
  };
  useEffect(() => {
    getClubDetails();
  }, []);

  return clubDetails ? (
    <div className="flex flex-col justify-center items-center bg-blue-100 m-2">
      <h1 className="text-xl uppercase  text-2xl m-2 p-2 ">
        {clubDetails.name}
      </h1>
      <div className="flex flex-col m-2">
        {console.log("in react", clubDetails.events, clubDetails.admins)}
        <h2 className=" text-xl uppercase text-xl m-1">Admins</h2>
        {clubDetails.admins.map((item, index) => (
          <div className="p-1" key={index}>
            - {item.name}
          </div>
        ))}
      </div>
      <div className="flex flex-col m-2">
        <h2 className=" text-xl uppercase text-xl m-1">Events</h2>
        {clubDetails.events.map((item, index) => (
          <div
            className="p-1 cursor-pointer"
            key={index}
            onClick={() => navigate(`/event/${item._id}`)}
          >
            - {item.name}
          </div>
        ))}
      </div>
      {isClubAdmin ? (
        <div>
          <button
            className="m-2 py-2 px-1 border-2 rounded-lg uppercase bg-blue-200"
            onClick={handleUpdate}
          >
            Update Club
          </button>
          <button
            className="m-2 py-2 px-1 border-2 rounded-lg uppercase bg-blue-200"
            onClick={handleCreateEvent}
          >
            Add Event
          </button>
          <button
            className=" m-2 py-2 px-1 border-2 rounded-lg uppercase bg-blue-200"
            onClick={handleDelete}
          >
            Delete Club
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

export default ClubPage;
