import React from "react";
import { useNavigate } from "react-router-dom";
import { Forms } from "../components/Forms.jsx";
import fetcher from "../utils/fetcher.js";

const registrationInputs = [
  {
    name: "name",
    type: "text",
    label: "Name",
  },
  {
    name: "email",
    type: "email",
    label: "Email Id",
  },
  {
    name: "dateOfBirth",
    type: "date",
    label: "Date of Birth",
  },
  {
    name: "password",
    type: "password",
    label: "Password",
  },
  {
    name: "rollNo",
    type: "text",
    label: "Register Number",
  },
  {
    name: "branch",
    type: "text",
    label: "Branch",
  },
  {
    name: "batch",
    type: "number",
    label: "Batch",
  },
  {
    name: "mobileNo",
    type: "number",
    label: "Mobile Number",
  }
];

const Register = () => {
  const navigate = useNavigate();

  const registerUser = async (formData) => {
    try {
      const response = await fetcher("https://clubify.onrender.com/api/user/register", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        alert("Registration successful");
        navigate("/login");
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred during registration");
    }
  };

  return (
    <div className="container flex justify-center items-center h-screen ">
      <div className="w-1/3">
        <h1 className="text-xl font-bold mb-5">Register</h1>
        <Forms inputs={registrationInputs} onSubmit={registerUser} />
      </div>
    </div>
  );
};

export default Register;
