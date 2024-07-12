/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, ProgressBar } from "react-bootstrap";
import { useState, useEffect } from "react";
import amenityIcons from "./AmenityIcon";
import "./ParkModal.css";

interface ParkModalProps {
  show: boolean;
  handleClose: () => void;
  parkName: string;
  distance: number;
  busyness: number;
  isCafe: number;
  isToilet: number;
  isToiletHandicapAccess: number;
  isPlayground: number;
  isRestaurant: number;
  isShelter: number;
  isDrinkingWater: number;
  isBar: number;
  isBench: number;
  isGarden: number;
  isFountain: number;
  isMonument: number;
}

function ParkModal({
  show,
  handleClose,
  parkName,
  // distance,
  busyness,
  isCafe,
  isToilet,
  isPlayground,
  isToiletHandicapAccess,
  isRestaurant,
  isShelter,
  isDrinkingWater,
  isBar,
  isBench,
  isGarden,
  isFountain,
  isMonument,
}: ParkModalProps) {
  const [weather, setWeather] = useState<any | null>(null);
  const [airQuality, setAirQuality] = useState<any | null>(null);

  useEffect(() => {
    if (show) {
      fetchWeather();
      fetchAirQuality();
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

  const fetchAirQuality = async () => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    const lat = "40.7834";
    const lon = "-73.9662";
    const airQualityUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    try {
      const airQualityResponse = await fetch(airQualityUrl);
      const airQualityData = await airQualityResponse.json();
      console.log("Air quality data", airQuality);
      setAirQuality(airQualityData);
    } catch (error) {
      console.error("Failed to fetch air quality data...", error);
    }
  };

  // const formatTime = (timestamp: number) => {
  //   const date = new Date(timestamp * 1000);
  //   return date.toLocaleTimeString("en-US", {
  //     hour: "2-digit",
  //     minute: "2-digit",
  //     timeZone: "America/New_York",
  //   });
  // };

  // const formatYesNo = (value: number): string => (value === 1 ? "Yes" : "No");

  // const busynessScore = (value: number): string => {
  //   if (value >= 66) {
  //     return "High";
  //   } else if (value >= 33) {
  //     return "Medium";
  //   } else {
  //     return "Low";
  //   }
  // };

  const getVariant = (busyness: number) => {
    if (busyness <= 33) return "success";
    if (busyness <= 66) return "warning";
    return "danger";
  };
  const getLabel = (busyness: number) => {
    if (busyness <= 33) return "Low";
    if (busyness <= 66) return "Medium";
    return "High";
  };

  function transformAQI(aqi) {
    if (aqi === 1) return "good";
    if (aqi === 2) return "fair";
    if (aqi === 3) return "moderate";
    if (aqi === 4) return "poor";
    if (aqi === 5) return "very poor";
    return "unknown";
  }
  // function resolveDistance(distance: number) {
  //   return `${distance.toFixed(2)} km`;
  // }

  const shareText = encodeURIComponent(
    `Heading to ${parkName}! Check it out on ParkFinder.`
  );
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${shareText}`;
  const whatsappShareUrl = `https://wa.me/?text=${shareText}`;

  const amenities = [
    { name: "Toilet", value: isToilet },
    { name: "Accessible Toilet", value: isToiletHandicapAccess },
    { name: "Playground", value: isPlayground },
    { name: "Benches", value: isBench },
    { name: "Shelter", value: isShelter },
    { name: "Drinking Fountain", value: isDrinkingWater },
    { name: "Cafe", value: isCafe },
    { name: "Restaurant", value: isRestaurant },
    { name: "Bar", value: isBar },
    { name: "Garden", value: isGarden },
    { name: "Fountain", value: isFountain },
    { name: "Monument", value: isMonument },
  ];

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{parkName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="weather-box">
          {weather ? (
            <div className="weather-ticker">
              <div className="weather-item">
                <span className="temp">{weather.main.temp}°C</span>
                <span className="forecast">
                  {weather.weather[0].description}
                  <img
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                    alt="Weather icon"
                  />
                  {transformAQI(airQuality.list[0].main.aqi)} air quality
                </span>
              </div>
            </div>
          ) : (
            <p>No weather information available.</p>
          )}
        </div>
        <div className="modal-content-wrapper">
          <div className="amenities-section">
            <h5 className="amenities-heading">Amenities</h5>
            <div className="amenities-grid">
              {amenities.map(
                (amenity) =>
                  amenity.value === 1 && (
                    <div key={amenity.name} className="amenity-item">
                      <img
                        src={amenityIcons[amenity.name] || amenityIcons.default}
                        alt={amenity.name}
                        className="amenity-icon"
                      />
                      {amenity.name}
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
        <div className="busyness-section">
          <h5>How busy is {parkName} right now?</h5>
          <span className="busyness-bar">
            <ProgressBar
              now={busyness}
              label={getLabel(busyness)}
              variant={getVariant(busyness)} // Color variant of the progress bar
            />
          </span>
        </div>
        <div className="icons-section">
          <a
            href={whatsappShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="share-icons"
          >
            <i className="fa fa-whatsapp"></i>
          </a>
          <a
            href={twitterShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="share-icons"
          >
            <i className="fa fa-twitter"></i>
          </a>
          <a href="#" target="_blank" className="share-icons">
            <i className="fa fa-heart-o"></i>
          </a>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ParkModal;
