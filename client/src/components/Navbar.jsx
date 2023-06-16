import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../state/slices/loginSlice";
import { useLoginState } from "../state";
import { Link , useNavigate } from "react-router-dom";

const Navlink = ({ link, children }) => {
  return (
    <Link to={link} className="p-4 bg-blue-500 rounded-full p-4 m-2">
      {children}
    </Link>
  );
};

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginState = useLoginState();

  const logoutUser = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center bg-gray-200 p-4">

      <button
        className = "text-white font-bold text-lg"
        onClick={() => navigate("/")}
      >
        Clubify
      </button>
      <div className="text-white font-bold text-sm mr-auto">
        {loginState.user && (
          <>
            <Navlink link="/clubs">Clubs</Navlink>
            <Navlink link="/events">Events</Navlink>
          </>)}
      </div>
      
      <div className="text-white font-bold ">
        {loginState.user ? (
          <>
              <Navlink link={`/dashboard/${loginState.user._id}`} >
                {loginState.user.name}
              </Navlink>
              <button onClick={logoutUser} className="p-4 bg-blue-500 rounded-full p-4 m-2">
                Logout
              </button>
          </>
        ) : (
          <>
            <Navlink link="/login">Login</Navlink>
            <Navlink link="/register">Register</Navlink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
