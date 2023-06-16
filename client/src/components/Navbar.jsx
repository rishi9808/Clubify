import React from "react"
import { useDispatch } from "react-redux"
import { logout } from "../state/slices/loginSlice"
import { useLoginState } from "../state"
import { useNavigate, NavLink as RRNavLink } from "react-router-dom"

const NavLink = ({ link, children }) => {
  return (
    <RRNavLink
      exact
      to={link}
      className={({ isActive }) =>
        "px-2 py-2 m-1 border-b-2 hover:border-white " +
        (isActive ? "border-white" : "border-transparent")
      }
    >
      {children}
    </RRNavLink>
  )
}

const Navbar = () => {
  const navigate = useNavigate()
  const loginState = useLoginState()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }

  return (
    <header className=" flex items-center z-30 w-full bg-gray-800">
      <div className="  mx-4 my-2  px-4 flex items-center w-full uppercase text-white font-bold">
        <button
          className="text-lg font-bold uppercase mr-8 focus:outline-none"
          onClick={() => navigate("/")}
        >
          Clubify
        </button>

        <div className=" flex text-white font-bold text-sm mr-auto">
          {loginState.user && (
            <>
              <NavLink link={`/dashboard/${loginState.user._id}`}>dashboard</NavLink>
              <NavLink link="/clubs">clubs</NavLink>
              <NavLink link="/events">events</NavLink>
            </>
          )}
        </div>
        <div className="flex text-white font-bold text-sm ml-auto">
          {loginState.user ? (
            <>
              <NavLink link={`/profile/${loginState.user._id}`}>
                {loginState.user.name}
              </NavLink>
              <button
                className="font-bold uppercase py-2 px-2 m-1 focus:outline-none border-b-2 border-transparent hover:border-white"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink link="/login"> Login </NavLink>
              <NavLink link="/register"> Register </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
