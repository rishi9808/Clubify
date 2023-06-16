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
      <div>
        <h1>Clubs</h1>
        {clubDetails.map((club) => (
          <div className="flex" key={club._id}>
            <div>{club.name}</div>
            <button
              className="btn btn-primary"
              onClick={() => handleView(club._id)}
            >
              View Club
            </button>
          </div>
        ))}
      </div>
    )
  );
};

export default ViewClubs;
