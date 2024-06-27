/* eslint-disable @typescript-eslint/no-unused-vars */
import { Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import _default from "react-bootstrap/esm/Accordion";

interface ParkModalProps {
  show: boolean;
  handleClose: () => void;
  park: { name: string; image: string };
}

function ParkModal({ show, handleClose, park }: ParkModalProps) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (show) {
      fetchWeather();
    }
  }, [show]);

  const fetchWeather = async () => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Manhattan&appid=${apiKey}&units=metric`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeather({
        ...data,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
      });
      console.log("weather log", data);
    } catch (error) {
      console.error("Failed to fetch weather...", error);
      setWeather(null);
    }
  };

  //convert UNIX timestamp to real time for sunrise/sunset info
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/New_York",
    });
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{park.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {weather ? (
          <div className="weather">
            <p id="forecast">
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt="Weather icon"
              />
              {weather.main.temp}°C, {weather.weather[0].description}{" "}
            </p>
            <p id="sun">
              Sunrise: {formatTime(weather.sunrise)} <br />
              Sunset: {formatTime(weather.sunset)}
            </p>
          </div>
        ) : (
          <p>No weather information available.</p>
        )}
        <p>Park Information To Be Populated</p>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button variant="secondary" onClick={handleClose}>
          Close
        </Button> */}
      </Modal.Footer>
    </Modal>
  );
}

export default ParkModal;
