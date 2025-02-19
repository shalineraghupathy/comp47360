/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MouseEvent } from "react";
import { Modal, ProgressBar } from "react-bootstrap";
import { useState, useEffect } from "react";
import amenityIcons from "./AmenityIcon";
import "./ParkModal.css";
import { addFavorite, removeFavorite } from "../../services/favourites"; // Adjust the path as needed

import { showToastError } from "../toast/toast";

interface ParkModalProps {
  show: boolean;
  handleClose: () => void;
  parkName: string;
  parkId: string;
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
  isFavourite: boolean; // Corrected spelling to match component logic
}

function ParkModal({
  show,
  handleClose,
  parkName,
  parkId,
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
  isFavourite, // Corrected spelling to match component logic
}: ParkModalProps) {
  const [weather, setWeather] = useState<any | null>(null);
  const [airQuality, setAirQuality] = useState<any | null>(null);
  const [isFavorite, setIsFavorite] = useState(isFavourite); // Initialize state with prop

  useEffect(() => {
    if (show) {
      const fetchWeather = async () => {
        const apiKey =
          (import.meta.env.VITE_OPENWEATHER_API_KEY as string) ||
          "6ae70477e5e1b628641f75264ebcb0c6";
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
        const apiKey =
          (import.meta.env.VITE_OPENWEATHER_API_KEY as string) ||
          "6ae70477e5e1b628641f75264ebcb0c6";
        const lat = "40.7834";
        const lon = "-73.9662";
        const airQualityUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        try {
          const airQualityResponse = await fetch(airQualityUrl);
          const airQualityData = await airQualityResponse.json();
          console.log("Air quality data", airQualityData);
          setAirQuality(airQualityData);
        } catch (error) {
          console.error("Failed to fetch air quality data...", error);
        }
      };
      fetchWeather();
      fetchAirQuality();
    }
  }, [show]);

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

  function transformAQI(aqi: number) {
    if (aqi === 1) return "good";
    if (aqi === 2) return "fair";
    if (aqi === 3) return "moderate";
    if (aqi === 4) return "poor";
    if (aqi === 5) return "very poor";
    return "unknown";
  }

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

  const handleFavoriteClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Check if user is logged in by checking token in local storage
    const token = localStorage.getItem("token");
    if (!token) {
      showToastError("You must be logged in to add or remove favorites.");
      // alert("You must be logged in to add or remove favorites.");
      return;
    }

    try {
      if (isFavorite) {
        await removeFavorite(parkId, token);
        setIsFavorite(false);
      } else {
        await addFavorite(parkId, token);
        setIsFavorite(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Failed to update favorites", error.message);
      } else {
        console.error("Failed to update favorites", error);
      }
    }
  };

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
              variant={getVariant(busyness)}
            />
          </span>
        </div>
        <div className="icons-section">
          <a
            href={whatsappShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="share-icons"
            style={{ color: "black" }}
          >
            <i className="fa fa-whatsapp"></i>
          </a>
          <a
            href={twitterShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="share-icons"
            style={{ color: "black" }}
          >
            <i className="fa fa-twitter"></i>
          </a>
          <a
            href="#"
            className="share-icons"
            onClick={handleFavoriteClick}
            style={{
              color: isFavorite ? "red" : "seagreen",
              transition: "color 0.3s",
              display: "inline-block",
            }}
          >
            <i className={`fa ${isFavorite ? "fa-heart" : "fa-heart-o"}`}></i>
          </a>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ParkModal;
