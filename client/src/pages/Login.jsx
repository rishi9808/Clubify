import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Forms from "../components/Forms.jsx";
import fetcher from "../utils/fetcher.js";
import { login } from "../state/slices/loginSlice.js";

const loginInputs = [
  { name: "email", type: "email", label: "Email Id" },
  { name: "password", type: "password", label: "Password" },
];

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginUser = async (formData) => {
    try {
      const response = await fetcher("api/user/login", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        const { user, token } = data;
        localStorage.setItem("token", token);
        alert("login successful");
        dispatch(login({ user, token }));
        navigate(`/user/${user._id}`)
        //window.location.href = '/'
      } else {
        alert("login failed!!! Check your email or password");
        const error = await response.text();
        console.log(error);
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
