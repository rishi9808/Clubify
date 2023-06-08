import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import fetcher from "../utils/fetcher";
import { Forms } from "../components/Forms.jsx";

const UpdateClub = [
  {
    name: "name",
    type: "text",
    label: "Club name",
  },
];

const CreateClub = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  async function registerClub(formData) {
    const res = await fetcher(`api/club/${id}`, {
      method: " POST",
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.status === 200) {
      alert("Succfully updated club");
      navigate(`/club/${id}`);
    }
    console.log(data);
  }

  return (
    <div className="flex flex-col align-center items-center m-2">
      <h1 className="text-xl font-bold mb-5">Update Club</h1>
      <Forms inputs={UpdateClub} onSubmit={registerClub} />
    </div>
  );
};
export default CreateClub;
