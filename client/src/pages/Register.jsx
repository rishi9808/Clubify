import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../const";

const registrationInputs = [
  {
    name: "name",
    type: "text",
  },
  {
    name: "email",
    type: "email",
  },
  {
    name: "password",
    type: "password",
  },
  {
    name: "regNo",
    type: "text",
  },
  {
    name: "branch",
    type: "text",
  },
  {
    name: "batch",
    type: "number",
  },
];

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  const handleInputChange = (event) => {
    const { target } = event;
    const key = target.name;
    const value =
      target.type === "number"
        ? target.valueAsNumber
        : target.value;

    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(API_URL);

    const response = await fetch(`${API_URL}/api/user/register `, {
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
  };

  return (
    <div className="container flex justify-center items-center h-screen ">
      <div className="w-1/3">
      <h1 className="text-3xl font-bold mb-5">Register</h1>
      <form onSubmit={handleSubmit}>
        {registrationInputs.map((input, index) => {
          const value =
            input.type === "date"
              ? new Date(formData[input.name]).toISOString().split("T")[0]
              : formData[input.name];

          return (
            <div  
            className="mb-4"
            >
            
            <label 
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor={input.type}>
              {input.name}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder={input.name}
              {...input}
              required
              value={value}
              key={index}
              onChange={handleInputChange}
            />
          </div>
          );
        })}
        <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
        >Register</button>
      
      </form>
    </div>
    </div>
  );
}

export default Register;
