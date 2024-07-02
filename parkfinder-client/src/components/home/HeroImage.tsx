import { useState, useEffect } from "react";
import "./HeroImage.css";

const images = ["./public/1.jpg", "./public/3.jpg", "./public/6.jpg"];

function HeroImage() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        className="hero-image"
        style={{ backgroundImage: `url(${images[currentImage]})` }}
      >
        <div className="overlay"></div>
      </div>
    </>
  );
}

export default HeroImage;
