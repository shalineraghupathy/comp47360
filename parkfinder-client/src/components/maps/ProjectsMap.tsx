import { useMemo } from "react";
import { GoogleMap } from "@react-google-maps/api";
import useLoadGoogleMapsScript from "./loadMap";
import mapStyles from "./mapStyles"; // Import the map styles

const { VITE_GOOGLEMAP_KEY: mapconfig } = import.meta.env;

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 40.7831,
  lng: -73.9712,
};

const GoogleMapComponent = () => {
  const isLoaded = useLoadGoogleMapsScript(mapconfig);
  const memoizedStyles = useMemo(() => mapStyles, []);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      options={{ styles: memoizedStyles }}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  );
};

export default GoogleMapComponent;
