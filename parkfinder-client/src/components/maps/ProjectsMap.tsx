/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import React, { useEffect } from "react";
import {
  GoogleMapProvider,
  useGoogleMap,
} from "../../contexts/googleMapContext";
import ResultCard from "../results/ResultCard";

const MapContent: React.FC<{ parks: any[] }> = ({ parks }) => {
  const { addMarker, fitBoundsToMarkers, selectedPark } = useGoogleMap();

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
              parkID={selectedPark.parkID}
              isFavourite={selectedPark.isFavourite}
            />
          </div>
        </div>
      )}
    </>
  );
};

const GoogleMapComponent: React.FC<{ parks: any[] }> = ({ parks }) => {
  return (
    <GoogleMapProvider>
      <MapContent parks={parks} />
    </GoogleMapProvider>
  );
};

export default GoogleMapComponent;
