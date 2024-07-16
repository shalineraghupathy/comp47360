/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  GoogleMapProvider,
  useGoogleMap,
} from "../../contexts/googleMapContext";
import { getParks, convertToTimestamp } from "../../services/parks";
import ResultCard from "../results/ResultCard";

const defaultLocation = { lat: 40.7831, lng: -73.9712 };
const defaultTimestamp = convertToTimestamp("2024-07-01", "12:00");

const MapContent: React.FC = () => {
  const { addMarker, fitBoundsToMarkers, selectedPark } = useGoogleMap();
  const [parks, setParks] = useState<any[]>([]);

  useEffect(() => {
    const fetchParks = async () => {
      try {
        const parksData = await getParks(
          defaultLocation.lat,
          defaultLocation.lng,
          defaultTimestamp
        );
        setParks(parksData);
      } catch (error) {
        console.error("Error fetching parks:", error);
      }
    };

    fetchParks();
  }, []);

  useEffect(() => {
    parks.forEach((park) => {
      addMarker(
        { lat: park.park.entrances[0].lat, lng: park.park.entrances[0].lon },
        {
          ...park.park,
          distance: park.distance,
          busyness: park.busyness,
        }
      );
    });
    fitBoundsToMarkers();
  }, [parks, addMarker, fitBoundsToMarkers]);

  return (
    <>
      <div>Your map will be rendered here.</div>
      {selectedPark && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            width: "100%",
            zIndex: 1000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
          }}
        >
          <div
            style={{
              width: "60%",
              maxHeight: "20%",
              backgroundColor: "none",
              overflow: "hidden",
              borderRadius: "20px 20px 0 0",
              padding: "20px", // Add some padding if needed
            }}
          >
            <ResultCard
              parkName={selectedPark.parkName}
              distance={selectedPark.distance}
              busyness={selectedPark.busyness}
              isCafe={selectedPark.isCafe}
              isToilet={selectedPark.isToilet}
              isPlayground={selectedPark.isPlayground}
              isToiletHandicapAccess={selectedPark.isToiletHandicapAccess}
              isRestaurant={selectedPark.isRestaurant}
              isShelter={selectedPark.isShelter}
              isDrinkingWater={selectedPark.isDrinkingWater}
              isBar={selectedPark.isBar}
              isBench={selectedPark.isBench}
              isGarden={selectedPark.isGarden}
              isFountain={selectedPark.isFountain}
              isMonument={selectedPark.isMonument}
            />
          </div>
        </div>
      )}
    </>
  );
};

const GoogleMapComponent: React.FC = () => {
  return (
    <GoogleMapProvider>
      <MapContent />
    </GoogleMapProvider>
  );
};

export default GoogleMapComponent;
