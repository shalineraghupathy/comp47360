import { useState, useEffect } from "react";
import "./HeroImage.css";

const images = ["./1.jpg", "./3.jpg", "./6.jpg"];

function HeroImage() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div
        className="hero-image"
        style={{ backgroundImage: `url(${images[currentImage]})` }}
      >
        <div className="overlay"></div>
      </div>
    </div>
  );
}

export default HeroImage;
