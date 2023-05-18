import React, { useState } from "react";
import Forms from "../components/Forms.jsx";
import { API_URL } from "../const";

const loginInputs = [
  { name: "email", type: "email", label: "Email Id" },
  { name: "password", type: "password", label: "Password" },
];

const Login = () => {
  const loginUser = async (formData) => {
    try {
      const response = await fetch(`${API_URL}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        console.log(data.token);
        console.log("login successful");
        alert("Login successful");
        localStorage.setItem("token", data.token);
        //window.location.href = '/'
      } else {
        console.log("login failed");
        const error = await response.text();
        alert(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/3">
        <h1 className="text-xl font-bold mb-5">Login</h1>
        <Forms inputs={loginInputs} onSubmit={loginUser} />
      </div>
    </div>
  );
};

export default Login;
