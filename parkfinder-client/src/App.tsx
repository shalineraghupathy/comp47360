import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import Home from "./components/home/MainContent";
import SignUp from "./components/signup/SignUp";
import Results from "./components/results/Results";
import FavouritesPage from "./components/signup/FavouritesPage";
import ProjectMap from "./components/maps/ProjectsMap";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.css";
import { UserProvider } from "./contexts/userContext"; // Import UserProvider
import NationalParks from "./components/nationalparks/nationalparks";
import EventCalendar from "./components/calendar/EventCalendar";
import PrivateRoute from "./services/PrivateRoute";

import ProfilePage from "./components/signup/ProfilePage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <NavBar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignUp />} />
          <Route path="/parkmap" element={<ProjectMap />} />
          <Route path="/results" element={<Results />} />
          <Route path="/NationalParks" element={<NationalParks />} />
          <Route path="/EventCalendar" element={<EventCalendar />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/favourites" element={<FavouritesPage />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
