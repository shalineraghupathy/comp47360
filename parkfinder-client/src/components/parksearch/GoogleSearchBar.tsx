import { useEffect } from "react";
import Autocomplete from "react-google-autocomplete";

interface GoogleSearchBarProps {
  onSelectLocation: (lat: number, lng: number) => void;
}

function GoogleSearchBar({ onSelectLocation }: GoogleSearchBarProps) {
  const apiKey =
    (import.meta.env.VITE_GOOGLE_API_KEY as string) ||
    "AIzaSyDtzE5ImdDBmxSZxz-6NFOCqRm2KYtzZm8";
  const scriptId = "script-id";

  useEffect(() => {
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=Function.prototype`;
      script.async = true;
      script.defer = true;
      script.id = scriptId;
      script.onload = () => {
        console.log("Maps script loaded successfully.");
      };
      script.onerror = (e) => {
        console.error("Error loading maps script.", e);
      };
      document.head.appendChild(script);
    }
  }, [apiKey, scriptId]);

  const handlePlaceSelected = (place: google.maps.places.PlaceResult) => {
    if (!place.geometry || !place.geometry.location) {
      return;
    }
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    onSelectLocation(lat, lng);
  };

  return (
    <div>
      <Autocomplete
        apiKey={apiKey}
        onPlaceSelected={handlePlaceSelected}
        options={{
          types: ["geocode"],
          componentRestrictions: {
            country: "us",
          },
        }}
        defaultValue=""
        placeholder="Enter a location"
        className="form-control"
      />
    </div>
  );
}

export default GoogleSearchBar;
