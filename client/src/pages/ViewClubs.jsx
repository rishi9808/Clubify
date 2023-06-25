import React, { useState, useEffect } from "react";
import fetcher from "../utils/fetcher";
import { useNavigate } from "react-router-dom";

const ViewClubs = () => {
  const navigate = useNavigate();
  const [clubDetails, setClubDetails] = useState(null);

  const getClubDetails = async () => {
    const response = await fetcher("api/club/", {
      method: "GET",
    });

    if (response.status === 200) {
      const data = await response.json();
      setClubDetails(data);
    }
  };

  const handleView = (clubId) => {
    navigate(`/club/${clubId}`);
  };

  useEffect(() => {
    getClubDetails();
  }, []);

  return (
    clubDetails && (
      <div className="min-h-screen flex w-full justify-center bg-gray-100">
        <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 m-auto rounded-3xl mt-5 w-3/4 max-w-4xl">
          <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
            <h1>Clubs</h1>
          </div>
          <div className="flex flex-wrap bg-gray-100 w-full p-2 py-8 rounded-xl mt-5">
            {clubDetails.map((club) => (
              <div
                className="overflow-hidden shadow-lg rounded-lg h-72 py-2 w-52 cursor-pointer m-auto"
                key={club._id}
              >
                <img
                  alt="event photo"
                  src="/images/clubs.svg"
                  className="max-h-40 w-full object-cover bg-white"
                />
                <div className="bg-white dark:bg-gray-800 w-full p-4">
                  <p className="text-indigo-500 text-sm font-medium">
                    {console.log(club?.name)}
                    {/* problem why how clubs */}
                  </p>
                  <p className="text-gray-800 dark:text-white text-lg font-medium mb-2">
                    {club.name}
                  </p>
                  <div className="flex items-center mt-4">
                    <button
                      className="uppercase rounded-lg py-2 px-4 bg-gray-800 border-2 border-transparent text-white text-base mr-4 hover:bg-gray-900"
                      onClick={() => handleView(club._id)}
                    >
                      View Club
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default ViewClubs;
