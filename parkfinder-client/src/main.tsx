import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Add this line to include Mapbox CSS
const link = document.createElement("link");
link.href = "https://api.tiles.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css";
link.rel = "stylesheet";
document.head.appendChild(link);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
