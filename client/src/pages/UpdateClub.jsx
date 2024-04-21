import React, { useState, useEffect } from "react";
import { Forms } from "../components/Forms";
import fetcher from "../utils/fetcher";
import { useNavigate, useParams } from "react-router-dom";

const updateClubAdminsInput = [
  {
    name: "adminEmails",
    type: "text",
    label: "Admin emails (comma-separated)",
  },
];

const UpdateClub = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [clubDetails, setClubDetails] = useState(null);

  const updateClubDetails = [
    {
      name: "name",
      type: "text",
      label: "Club name",
      defaultValue: clubDetails?.name,
    },
  ];

  const getClubDetails = async () => {
    const response = await fetcher(`api/club/${id}`, {
      method: "GET",
    });

    if (response.status === 200) {
      const data = await response.json();
      setClubDetails(data);
    }
  };

  const handleAdminRemove = async (adminId) => {
    const response = await fetcher(`api/club/${id}/admin/${adminId}`, {
      method: "DELETE",
    });

    if (response.status === 200) {
      alert("Successfully removed");
      const data = await response.json();
      setClubDetails(data);
      getClubDetails();
    }
    navigate(`/club/${id}/update`);
  };

  async function updateClub(formData) {
    const response = await fetcher(`api/club/${id}`, {
      method: "POST",
      body: JSON.stringify(formData),
    });

    if (response.status === 200) {
      alert("Successfully updated club");
      navigate(`/club/${id}`);
    }
  }

  async function updateClubAdmins(formData) {
    const admin_emails = formData.adminEmails
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email);

    const response = await fetcher(`api/club/${id}/admin`, {
      method: "POST",
      body: JSON.stringify({
        name: formData.name,
        admin_emails, // fixed
      }),
    });

    const data = await response.json();

    if (response.status === 200) {
      alert("Successfully updated club Admins");
      setClubDetails(data);
      getClubDetails();
      navigate(`/club/${id}/update`);
    }
  }

  useEffect(() => {
    getClubDetails();
  }, []);

  return clubDetails ? (
    <div className="flex flex-col justify-center items-center m-2">
      <h1 className="text-xl uppercase">Update {clubDetails.name} </h1>

      <div className="flex flex-col m-2 w-full items-center">
        <h2 className=" text-xl uppercase text-xl m-1">Admins</h2>
        {clubDetails.admins.map((item, index) => (
          <div className="flex justify-around w-full" key={index}>
            <span className="p-1 " key={index}>
              - {item.name}
            </span>
            <button
              className=" m-2 py-2 px-1 border-2 rounded-lg uppercase bg-gray-300"
              onClick={() => handleAdminRemove(item._id)}
            >
              remove
            </button>
          </div>
        ))}
      </div>
      <Forms inputs={updateClubDetails} onSubmit={updateClub} />
      <Forms inputs={updateClubAdminsInput} onSubmit={updateClubAdmins} />
    </div>
  ) : (
    <></>
  );
};

export default UpdateClub;
