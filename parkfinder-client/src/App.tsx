import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import Home from "./components/home/MainContent";
import SignUp from "./components/signup/SignUp";
import Results from "./components/results/Results";

import ProjectMap from "./components/maps/ProjectsMap";
import "bootstrap/dist/css/bootstrap.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/results" element={<Results />} />
        <Route path="parkmap" element={<ProjectMap />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
