/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import "./ParkModal.css";

interface ParkModalProps {
  show: boolean;
  handleClose: () => void;
  parkName: string;
  distance: string;
  busyness: number;
  isCoffeeShop: number;
  isToilet: number;
  activities: { id: string; name: string }[];
}

function ParkModal({
  show,
  handleClose,
  parkName,
  distance,
  busyness,
  isCoffeeShop,
  isToilet,
  activities,
}: ParkModalProps) {
  const [weather, setWeather] = useState<any | null>(null);

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

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/New_York",
    });
  };

  const formatYesNo = (value: number): string => (value === 1 ? "Yes" : "No");

  const busynessScore = (value: number): string => {
    if (value >= 66) {
      return "High";
    } else if (value >= 33) {
      return "Medium";
    } else {
      return "Low";
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{parkName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-content-wrapper">
          Distance: {distance} <br />
          Busyness: {busynessScore(busyness)}
          <br />
          Coffee Shop: {formatYesNo(isCoffeeShop)}
          <br />
          Toilets: {formatYesNo(isToilet)}
          <br />
          Activities: {activities.map((activity) => activity.name).join(", ")}
          <br />
          <div className="weather-box">
            {weather ? (
              <div className="weather-info">
                <div className="weather-header">
                  <p>Manhattan, NYC</p>
                  <p>{weather.weather[0].description}</p>
                </div>
                <div className="weather-main">
                  <div className="weather-temp">
                    <p>{weather.main.temp}°C</p>
                  </div>
                  <img
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                    alt="Weather icon"
                  />
                </div>
                <div className="weather-details-container">
                  <div className="weather-detail">
                    <p>Sunrise {formatTime(weather.sunrise)}</p>
                  </div>
                  <div className="weather-detail">
                    <p>Sunset {formatTime(weather.sunset)}</p>
                  </div>
                </div>
              </div>
            ) : (
              <p>No weather information available.</p>
            )}
          </div>
        </div>
        <div className="busyness-section">
          <h5>When is this park busy?</h5>
          <div className="busyness-chart">
            [Average Busyness Chart Placeholder]
          </div>
        </div>
        <div className="icons-section">
          <i className="share-icon">[Share Icon]</i>
          <i className="tweet-icon">[Twitter Icon]</i>
          <i className="heart-icon">[Heart Icon]</i>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ParkModal;
