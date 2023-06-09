import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fetcher from "../utils/fetcher";

const CreateClub = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [clubDetails, setClubDetails] = useState(null);
  const [error, setError] = useState(false);

  const handleUpdate = () => {
    navigate(`/club/${id}/update`);
  };

  const handleDelete = async () => {
    const res = await fetcher(`api/club/${id}`, {
        method: "DELETE",
        });
    
    
    if (res.status === 200) {
        alert("Successfully deleted club");
    }
    else{
        setError(true)
    }
    navigate("/club");
    };


  const getClubDetails = async () => {
    const res = await fetcher(`api/club/${id}`, {
      method: "GET",
    });
    if (res.status === 200) {
        const data = await res.json();
        setClubDetails(data);
    } else {
        setError(true);
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
      <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2" onClick={handleUpdate}>
            Update club
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2" onClick={handleDelete}>
            Delete club
        </button>
      </div>
    </div>
  ) : (
    <div></div>
  );
};
export default CreateClub;
