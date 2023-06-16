import { useEffect } from "react";
import { useDispatch } from "react-redux";
import fetcher from "./utils/fetcher.js";
import { login, logout } from "./state";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import CreateClub from "./pages/CreateClub.jsx";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import ViewActiveEvents from "./pages/ViewActiveEvents.jsx";
import ViewClubs from "./pages/ViewClubs.jsx";
import Profile from "./pages/Profile.jsx";
import UpdateClub from "./pages/UpdateClub.jsx";
import ClubPage from "./pages/ClubPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import EventPage from "./pages/EventPage.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";
import UpdateEvent from "./pages/UpdateEvent.jsx";
import Participants from "./pages/Participants.jsx";

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
          <Route path="/" exact element={<HomePage />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="events" exact element={<ViewActiveEvents />} />
          <Route path="clubs" exact element={<ViewClubs />} />
          <Route path="/dashboard/:id" exact element={<Dashboard />} />
          <Route path="dashboard/:id/profile" exact element={<Profile />} />
          <Route path="/club" exact element={<CreateClub />} />
          <Route path="/club/:id" exact element={<ClubPage />} />
          <Route path="/club/:id/update" exact element={<UpdateClub />} />
          <Route path="/club/:id/event" exact element={<CreateEvent />} />
          <Route path="/event/:eventId" exact element={<EventPage />} />
          <Route path="/event/:eventId/update" exact element={<UpdateEvent/>} />
          <Route path="/event/:eventId/participants" exact element={<Participants/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
