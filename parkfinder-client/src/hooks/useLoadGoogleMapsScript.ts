import { useState, useEffect } from "react";

type MapConfig = string;

const useLoadGoogleMapsScript = (mapconfig: MapConfig) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const existingScript = document.getElementById("googleMapsScript");

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${mapconfig}&libraries=marker&v=beta`;
      script.id = "googleMapsScript";
      script.async = true;
      script.defer = true;
      script.onload = () => setIsLoaded(true);
      script.onerror = () =>
        console.error("Google Maps script could not be loaded.");

      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    } else {
      setIsLoaded(true);
    }
  }, [mapconfig]);

  return isLoaded;
};

export default useLoadGoogleMapsScript;
