// App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import Home from "./components/home/MainContent";
import SignUp from "./components/signup/SignUp";
import Results from "./components/results/Results";
import FavouritesPage from "./components/signup/FavouritesPage";
import ResultsMapView from "./components/results/resultsMapView";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.css";
import { UserProvider } from "./contexts/userContext";
import NationalParks from "./components/nationalparks/nationalparks";
import EventCalendar from "./components/calendar/EventCalendar";
import Heatmap from "./components/maps/heatmap";

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
          <Route path="/resultsmap" element={<ResultsMapView />} />
          <Route path="/results" element={<Results />} />
          <Route path="/NationalParks" element={<NationalParks />} />
          <Route path="/EventCalendar" element={<EventCalendar />} />
          <Route path="/Heatmap" element={<Heatmap />} />
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
