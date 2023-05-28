import React from "react";
import { useLoginState } from "../state";
import { Link } from "react-router-dom";

const Navlink = ({ link, children }) => {
  return (
    <Link to={link} className="p-4 bg-blue-500 rounded-full p-4 m-2">
      {children}
    </Link>
  );
};

const Navbar = () => {
  const loginState = useLoginState();

  return (
    <div className="flex justify-between items-center bg-gray-200 p-4">
        <h1 className="text-xl font-bold">Clubify</h1>
        <div className="text-white font-bold ">
          {loginState.user ? (
            <Navlink link="/profile">{loginState.user.name}</Navlink>
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
