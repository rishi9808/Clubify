import React from "react";
import { Forms } from "../components/Forms";
import fetcher from "../utils/fetcher";
import { useNavigate } from "react-router-dom";

const createClubInputs = [
  { name: "name", type: "text", label: "Club name" },
  {
    name: "admin_emails",
    type: "text",
    label: "Admin emails (comma-separated)",
  },
];

const CreateClub = () => {
  const navigate = useNavigate();
  async function registerClub(formData) {
    const adminEmails = formData.admin_emails
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email !== "");


    try {
      const response = await fetcher("api/club/", {
        method: "POST",
        body: JSON.stringify({
          name: formData.name,
          admin_emails: adminEmails,
        }),
      });

      const data = await response.json();
      if (response.status === 200) {
        alert("Club registration successful");
        // navigate("/login");
        navigate(`/club/${data._id}`);
      } else {
        alert("Club registration failed");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred during club registration");
    }
  }

  return (
    <div className="flex flex-col align-center items-center m-2">
      <h1 className="text-xl font-bold mb-5">Create Club</h1>
      <Forms inputs={createClubInputs} onSubmit={registerClub} />
    </div>
  );
};

export default CreateClub;
