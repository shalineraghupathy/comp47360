import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLoadScript, Libraries } from "@react-google-maps/api";
import mapStyles from "../components/maps/mapStyles"; // Import the map styles

interface Location {
  lat: number;
  lng: number;
}

interface Park {
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

interface GoogleMapContextProps {
  map: google.maps.Map | null;
  addMarker: (location: Location, park: Park) => void;
  selectedPark: Park | null;
  fitBoundsToMarkers: () => void;
}

const GoogleMapContext = createContext<GoogleMapContextProps | undefined>(
  undefined
);

const libraries: Libraries = ["places", "drawing", "geometry"];

const mapContainerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 40.7831,
  lng: -73.9712,
};

const GoogleMapProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedPark, setSelectedPark] = useState<Park | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [boundsFitted, setBoundsFitted] = useState(false); // New state
  const mapRef = useRef<HTMLDivElement | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLEMAP_KEY as string,
    libraries,
  });

  useEffect(() => {
    if (isLoaded && mapRef.current && !map) {
      const mapInstance = new google.maps.Map(mapRef.current, {
        center,
        zoom: 13,
        styles: mapStyles, // Apply the styles here
      });
      setMap(mapInstance);
    }
  }, [isLoaded, map]);

  const addMarker = (location: Location, park: Park) => {
    if (map) {
      const marker = new google.maps.Marker({
        position: location,
        map,
        title: park.parkName,
        icon: {
          url: "public/trees.svg",
          scaledSize: new google.maps.Size(40, 40),
        },
      });

      marker.addListener("click", () => {
        setSelectedPark(park);
      });

      setMarkers((prevMarkers) => [...prevMarkers, marker]);
    }
  };

  const fitBoundsToMarkers = () => {
    if (map && markers.length > 0 && !boundsFitted) {
      const bounds = new google.maps.LatLngBounds();
      markers.forEach((marker) => {
        bounds.extend(marker.getPosition() as google.maps.LatLng);
      });
      map.fitBounds(bounds);
      setBoundsFitted(true); // Ensure this only runs once
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  return (
    <GoogleMapContext.Provider
      value={{ map, addMarker, selectedPark, fitBoundsToMarkers }}
    >
      <div ref={mapRef} style={mapContainerStyle} />
      {children}
    </GoogleMapContext.Provider>
  );
};

const useGoogleMap = () => {
  const context = useContext(GoogleMapContext);
  if (!context) {
    throw new Error("useGoogleMap must be used within a GoogleMapProvider");
  }
  return context;
};

export { GoogleMapProvider, useGoogleMap };
