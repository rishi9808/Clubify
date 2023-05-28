import React from "react";
import { Forms } from "../components/Forms";
import fetcher from "../utils/fetcher";

const createClubInputs = [
  { name: "name", type: "text", label: "Club name" },
  {
    name: "admin_emails",
    type: "text",
    label: "Admin emails (comma-separated)",
  },
];

const CreateClub = () => {
  async function registerClub(formData) {
    const adminEmails = formData.admin_emails
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email !== "");

    console.log(adminEmails);

    try {
      const response = await fetcher("api/club/", {
        method: "POST",
        body: JSON.stringify({
          name: formData.name,
          admin_emails: adminEmails,
        }),
      });

      //console.log(response);
      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        alert("Club registration successful");
        // navigate("/login");
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
