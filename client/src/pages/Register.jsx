import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Forms } from "../components/Forms.jsx";
import { API_URL } from "../const";

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
    name: "password",
    type: "password",
    label: "Password",
  },
  {
    name: "regNo",
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
];

const Register = () => {
  const navigate = useNavigate();

  const registerUser = async (formData) => {
    try {
      const response = await fetch(`${API_URL}/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.status === 200) {
        alert("Registration successful");
        navigate("/login");
      } else {
        alert("Registration failed");
      }

      console.log(data);
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
