import React, { useEffect, useState } from "react";
import fetcher from "../utils/fetcher";
import { useNavigate, useParams } from "react-router-dom";
import { useLoginState } from "../state/slices/loginSlice";

const Dashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useLoginState();
  const [userDetails, setUserDetails] = useState(null);

  const getUserDetails = async () => {
    const res = await fetcher(`api/user/${id}`, {
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
    getUserDetails();
  }, []);

  return (
    userDetails && (
      <div className="flex flex-col justify-center items-center bg-blue-100 m-2">
        <h1 className="text-xl uppercase text-2xl m-2 p-2">
          Welcome {userDetails.name}
        </h1>
        <button
          className="m-2 p-2 bg-blue-500 text-white rounded-lg"
          onClick={() => navigate(`/dashboard/${userDetails._id}/profile`)}
        >
          update profile
        </button>
        {user?.superAdmin && (
          <button
            className="m-2 p-2 bg-blue-500 text-white rounded-lg"
            onClick={() => navigate("/club")}
          >
            Add Club
          </button>
        )}
        {userDetails?.adminOfClub?.length > 0 && (
          <div>
            <h3>Your Clubs</h3>
            {userDetails.adminOfClub.map((club) => (
              <div className="flex" key={club._id}>
                <div>{club.name}</div>
                <button
                  className="m-2 p-2 bg-blue-500 text-white rounded-lg"
                  onClick={() => navigate(`/club/${club._id}`)}
                >
                  View Club details
                </button>
              </div>
            ))}
          </div>
        )}
        {userDetails?.participatedEvents?.length > 0 && (
          <div>
            <h3>registered events</h3>
            {userDetails.participatedEvents.map((event) => (
              <div className="flex" key={event._id}>
                <div>{event.name}</div>
                <button
                  className="m-2 p-2 bg-blue-500 text-white rounded-lg"
                  onClick={() => navigate(`/event/${event._id}`)}
                >
                  View Event details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  );
};

export default Dashboard;
