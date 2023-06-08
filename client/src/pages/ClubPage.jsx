import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fetcher from "../utils/fetcher";

const CreateClub = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [clubDetails, setClubDetails] = useState(null);

  const handleUpdate = () => {
    navigate(`/club/${id}/update`);
  };

  const getClubDetails = async () => {
    const res = await fetcher(`api/club/${id}`, {
      method: "GET",
    });
    const data = await res.json();
    console.log(data);

    if (data) {
      setClubDetails(data);
    } else {
      res.err({ error: data.error });
      navigate("/club");
    }
  };

  useEffect(() => {
    getClubDetails();
  }, []);

  return clubDetails ? (
    <div
      className="flex flex-col justify-center items-center
        bg-blue-100 m-2"
    >
      <h1 className="text-xl uppercase text-2xl m-2 p-2">{clubDetails.name}</h1>
      <div className="flex flex-col m-2">
        <h2 className="text-xl uppercase m-1">Admins</h2>
        {clubDetails.admins.map((admin, index) => (
          <div
            className="flex flex-row justify-between items-center m-1"
            key={index}
          >
            <p className="text-lg">{admin.name}</p>
          </div>
        ))}
      </div>
      <button className="border-1 bg-blue-200 m-2" onClick={handleUpdate}>
        Update Club
      </button>
    </div>
  ) : (
    <div></div>
  );
};
export default CreateClub;
