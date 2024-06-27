/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";

type MapConfig = string; // Define a proper type for the mapconfig

const useLoadGoogleMapsScript = (mapconfig: MapConfig) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${mapconfig}&libraries=&v=weekly`;
    script.async = true;
    script.defer = true;
    script.onload = () => setIsLoaded(true);

    document.head.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, [mapconfig]);

  return isLoaded;
};

export default useLoadGoogleMapsScript;
