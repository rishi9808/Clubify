import { useEffect } from "react";
import { useDispatch } from "react-redux";
import fetcher from "./utils/fetcher.js";
import { login, logout } from "./state";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import CreateClub from "./pages/CreateClub.jsx";
import Navbar from "./components/Navbar.jsx";
import UpdateClub from "./pages/UpdateClub.jsx";
import ClubPage from "./pages/ClubPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import EventPage from "./pages/EventPage.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";
import UpdateEvent from "./pages/UpdateEvent.jsx";

function App() {
  const dispatch = useDispatch();

  // Check if token in localStorage is valid and return user data

  const verifyToken = async (token) => {
    const res = await fetcher("api/user/verifyToken", {
      headers: {
        Authorization: token,
      },
    });
    const { user } = await res.json();
    dispatch(login({ user, token }));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      verifyToken(token);
    } else {
      dispatch(logout()); // when page loads show the user else log him out
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/register" exact element={<Register />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="user/:id" exact element={<Dashboard />} />
          <Route path="/club" exact element={<CreateClub />} />
          <Route path="/club/:id" exact element={<ClubPage />} />
          <Route path="/club/:id/update" exact element={<UpdateClub />} />
          <Route path="/club/:id/event" exact element={<CreateEvent />} />
          <Route path="/event/:eventId" exact element={<EventPage />} />
          <Route path="/event/:eventId/update" exact element={<UpdateEvent/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
