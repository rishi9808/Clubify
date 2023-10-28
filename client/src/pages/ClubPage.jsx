import React, { useEffect, useState } from "react";
import fetcher from "../utils/fetcher";
import { useNavigate, useParams } from "react-router-dom";
import { useLoginState } from "../state/slices/loginSlice";

const ClubPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [clubDetails, setClubDetails] = useState(null);

  const clubAdmins = clubDetails?.admins;
  const { user } = useLoginState();
  const isClubAdmin =
    user?.adminOfClub?.includes(clubDetails?._id) || user?.superAdmin;

  const handleUpdate = () => {
    navigate(`/club/${id}/update`);
  };

  const handleCreateEvent = () => {
    navigate(`/club/${id}/event`);
  };

  const handleDelete = async () => {
    const response = await fetcher(`https://clubify.onrender.com/api/club/${id}`, {
      method: "DELETE",
    });

    if (response.status === 200) {
      alert("Successfully deleted");
    }
    navigate("/club");
  };

  const getClubDetails = async () => {
    const response = await fetcher(`https://clubify.onrender.com/api/club/${id}`, {
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

  return (
    clubDetails &&
    user && (
      <div className="min-h-screen flex w-full justify-center bg-gray-100">
        <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 m-auto rounded-3xl mt-5 w-3/4 max-w-4xl">
          <div>
            <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
              {clubDetails.name}
            </div>
            <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
              Our teams and events
            </div>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow mt-4 bg-gray-50">
            <p className="font-medium self-center text-xl sm:text-2xl text-gray-800 px-4">
              Our Members
            </p>
            <div className="flex flex-wrap">
              {clubDetails.admins.map((item, index) => (
                <div key={index} className="p-4">
                  <div className="flex-col  flex justify-center items-center">
                    <div className="flex-shrink-0">
                      <img
                        alt="profil"
                        src="/images/avatarMale.svg"
                        className="mx-auto object-cover rounded-full h-20 w-20 "
                      />
                    </div>
                    <div className="mt-2 text-center flex flex-col">
                      <span className="text-gray-600 dark:text-white text-base font-medium">
                        {item.name}
                      </span>
                      <span className="text-gray-400 text-xs">Admin</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow mt-4 bg-gray-50">
            <p className="font-medium self-center text-xl sm:text-2xl text-gray-800 px-4">
              Our Events
            </p>
            <div className="flex flex-wrap p-2 py-8  ">
              {clubDetails.events.map((event, index) => (
                <div
                  key={index}
                  className="overflow-hidden shadow-lg rounded-lg  w-52 "
                >
                  <img
                    alt="event photo"
                    src="/images/events.svg"
                    className="max-h-40 w-full object-cover bg-white"
                  />
                  <div className="bg-white dark:bg-gray-800 w-full p-4">
                    <p className="text-gray-800 dark:text-white text-lg font-medium mb-2">
                      {event.name}
                    </p>
                    <p className="text-gray-400 dark:text-gray-300 text-sm">
                      {event.description}
                    </p>
                    <div className="flex items-center mt-4">
                      <button
                        className="uppercase rounded-lg py-2 px-4 bg-gray-800 border-2 border-transparent text-white text-base mr-4 hover:bg-gray-900"
                        onClick={() => navigate(`/event/${event._id}`)}
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
        <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 m-auto rounded-3xl mt-5 w-1/4">
          <div className="font-medium  text-xl sm:text-3xl text-gray-800">
            {user.name}
          </div>

          <div className="mt-4 text-xl sm:text-lg text-gray-800">
            Admin Section
          </div>
          {isClubAdmin && (
            <div className="flex flex-col ">
              <button
                className="uppercase my-4 rounded-lg py-2 px-4 bg-gray-800 border-2 border-transparent text-white text-base mr-4 hover:bg-gray-900"
                onClick={handleUpdate}
              >
                Update Club
              </button>
              <button
                className="uppercase my-4 rounded-lg py-2 px-4 bg-gray-800 border-2 border-transparent text-white text-base mr-4 hover:bg-gray-900"
                onClick={handleCreateEvent}
              >
                Add Event
              </button>
              <button
                className="uppercase my-4 rounded-lg py-2 px-4 bg-gray-800 border-2 border-transparent text-white text-base mr-4 hover:bg-gray-900"
                onClick={handleDelete}
              >
                Delete Club
              </button>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default ClubPage;
