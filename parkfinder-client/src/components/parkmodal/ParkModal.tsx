/* eslint-disable @typescript-eslint/no-unused-vars */
import { Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import _default from "react-bootstrap/esm/Accordion";
import "./ParkModal.css";

interface ParkModalProps {
  show: boolean;
  handleClose: () => void;
  park: { name: string };
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
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{park.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-content-wrapper">
            <table className="park-info-table">
              <tbody>
                <tr>
                  <td colSpan={2}>
                    <h5>Park Information</h5>
                  </td>
                </tr>
                <tr>
                  <td>Location</td>
                  <td>
                    <a href="#">View on Map</a>
                  </td>
                </tr>
                <tr>
                  <td>Opening Hours</td>
                  <td>9am – 9pm</td>
                </tr>
                <tr>
                  <td>Toilets</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>Disabled Toilets</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>Playground</td>
                  <td>Yes</td>
                </tr>
              </tbody>
            </table>
            <div className="weather-box">
              <h5>Weather</h5>
              <div className="weather-info">
                {weather ? (
                  <>
                    <p>
                      {weather.main.temp}°C, {weather.weather[0].description}
                      <img
                        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                        alt="Weather icon"
                      />
                    </p>
                    <p>Sunrise at {formatTime(weather.sunrise)}</p>
                    <p>Sunset at {formatTime(weather.sunset)}</p>
                  </>
                ) : (
                  <p>No weather information available.</p>
                )}
              </div>
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
    </>
  );
}

export default ParkModal;

{
  /* //1
  /* <div className="weather-box">
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
</div>
<p id="park-info">Park Information To Be Populated</p> */
}

// 2
{
  /* <div className="park-info">
<div className="info-section">
  <h5>Park Information</h5>
  <p>
    Location: <a href="#">View on map</a>
  </p>
  <p>Opening hours: 9am-9pm</p>
  <p>Toilets: Yes</p>
  <p>Disabled Access: Yes</p>
  <p>Playground: Yes</p>
</div>
<div className="weather-section">
  <h5>Weather</h5>
  {weather ? (
    <>
      <p id="forecast">
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
          alt="Weather icon"
        />
        <br />
        {weather.main.temp}°C, {weather.weather[0].description}{" "}
      </p>
      <p>Sunset: {formatTime(weather.sunset)}</p>
      <p>Sunrise: {formatTime(weather.sunrise)}</p>
    </>
  ) : (
    <p>No weather information available.</p>
  )}
</div>
</div>
<div className="busyness-section">
<h5>Busyness by Day</h5>
<div className="busyness-chart">[Chart Placeholder]</div>
</div>
<div className="icons">
<i className="share-icon">[Share Icon]</i>
<i className="tweet-icon">[Tweet Icon]</i>
<i className="favourite-icon">[Heart Icon]</i>
</div> */
}

{
  /* <table className="weather-info-table">
              <tbody>
                <tr>
                  <td colSpan={2}>
                    <h5>Weather</h5>
                  </td>
                </tr>
                <tr>
                  <td>Temperature</td>
                  <td>
                    {weather
                      ? `${weather.main.temp}°C, ${weather.weather[0].description}`
                      : "No weather information available."}
                  </td>
                </tr>
                <tr>
                  <td>Sunrise</td>
                  <td>{weather ? formatTime(weather.sunrise) : "-"}</td>
                </tr>
                <tr>
                  <td>Sunset</td>
                  <td>{weather ? formatTime(weather.sunset) : "-"}</td>
                </tr>
              </tbody>
            </table> */
}
