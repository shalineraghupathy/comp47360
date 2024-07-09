import { Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import amenityIcons from "../parkmodal/AmenityIcon";
import "../parkmodal/ParkModal.css";

interface ParkModalProps {
  show: boolean;
  handleClose: () => void;
  parkName: string;
  isCoffeeShop: number;
  isToilet: number;
}

function ParkModal({
  show,
  handleClose,
  parkName,
  isCoffeeShop,
  isToilet,
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

  const shareText = encodeURIComponent(
    `Heading to ${parkName}! Check it out on ParkFinder.`
  );
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${shareText}`;
  const whatsappShareUrl = `https://wa.me/?text=${shareText}`;

  const amenities = [
    { name: "Toilets", value: isToilet },
    { name: "Cafe", value: isCoffeeShop },
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
