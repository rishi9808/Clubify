import React, { useEffect, useState } from "react";
import fetcher from "../utils/fetcher";
import { useNavigate} from "react-router-dom";
import { useLoginState } from "../state/slices/loginSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useLoginState();
  const [userDetails, setUserDetails] = useState(null);

  const getUserDetails = async () => {
    const res = await fetcher(`api/user/${user._id}`, {
      method: "GET",
    });

    const data = await res.json();

    if (data) {
      setUserDetails(data);
    } else {
      res.err({ error: data.error });
    }
  };

  useEffect(() => {
    if (user?._id) {
      getUserDetails();
    }
  }, [user]);

  return (
    userDetails && (
      <div className="min-h-screen flex w-full justify-center bg-gray-100">
        <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 m-auto rounded-3xl mt-5 w-3/4 max-w-4xl">
          {userDetails?.participatedEvents ? (
            <div className="flex items-end justify-between mb-12">
              <div>
                <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
                  Your Events!!
                </div>
                <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
                  Below are all your participated events
                </div>
              </div>

              <div className="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
                <div className=" relative ">
                  <input
                    type="text"
                    id='"form-subscribe-Search'
                    className=" rounded-lg flex-1 border-2 border-gray-800 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none "
                    placeholder="Enter a title"
                  />
                </div>
                <button
                  className="uppercase rounded-lg py-2 px-4 bg-gray-800 border-2 border-transparent text-white text-base mr-4 hover:bg-gray-900"
                  type="submit"
                >
                  Search
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-4 self-center text-xl sm:text-sm text-gray-800 ">
              You have not registered in any events
            </div>
          )}
          <div className="flex flex-wrap bg-gray-100 w-full p-2 py-8 rounded-xl ">
            {userDetails.participatedEvents &&
              userDetails.participatedEvents.map((event, index) => (
                <div
                  key={index}
                  className="overflow-hidden shadow-lg rounded-lg h-72 py-2 w-52 cursor-pointer m-auto"
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
        <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 m-auto rounded-3xl mt-5 w-1/4">
          <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
            {userDetails.name}
          </div>
          {userDetails?.superAdmin && (
            <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
              Status : SuperAdmin
            </div>
          )}
          {user?.superAdmin && (
            <div className="flex flex-col">
              <button
                className=" m-2 py-2 px-1 border-2 rounded-lg uppercase bg-gray-800 hover:bg-gray-900 text-white"
                onClick={() => navigate("/club")}
              >
                Add Club
              </button>
              <button
                className=" m-2 py-2 px-1 border-2 rounded-lg uppercase bg-gray-800 hover:bg-gray-900 text-white"
                onClick={() => navigate("/clubs")}
              >
                View Clubs
              </button>
            </div>
          )}

          {userDetails?.adminOfClub?.length > 0 && (
            <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
              Status : ClubAdmin
            </div>
          )}
          {userDetails?.adminOfClub?.length != 0 && !user?.superAdmin && (
            <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
              Status : Student
            </div>
          )}
          {userDetails?.adminOfClub?.length > 0 && (
            <div>
              <h3>Your clubs</h3>
              {userDetails.adminOfClub.map((club, index) => (
                <div className="flex " key={index}>
                  <div>{club.name}</div>
                  <button
                    className=" m-2 py-2 px-1 border-2 rounded-lg uppercase bg-blue-200"
                    onClick={() => navigate(`/club/${club._id}`)}
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default Dashboard;
