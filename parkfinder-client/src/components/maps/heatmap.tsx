/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import DeckGL from "@deck.gl/react";
import { HexagonLayer } from "@deck.gl/aggregation-layers";
import StaticMap from "react-map-gl";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import "./Heatmap.css"; // Import the CSS file for styling
import { getHeatmapData, convertToTimestamp } from "../../services/parks"; // Adjust the path as needed

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1Ijoic2hhbGluZXJhZ2h1cGF0aHkiLCJhIjoiY2x5d3dlbDl6MWw4ejJrcWw1OWZra2ZsdCJ9.yL_rEd23ge5wzMZxLAjprg";

type ParkData = {
  park: {
    parkId: string;
    parkName: string;
    parkEntrance: string;
    entrances: { lat: number; lon: number }[];
    isCafe: number;
    isPlayground: number;
    isToilet: number;
    isToiletHandicapAccess: number;
    isRestaurant: number;
    isShelter: number;
    isDrinkingWater: number;
    isBar: number;
    isBench: number;
    isGarden: number;
    isFountain: number;
    isMonument: number;
  };
  busyness: number;
};

const Heatmap: React.FC = () => {
  const [data, setData] = useState<ParkData[]>([]);
  const [dateTime, setDateTime] = useState<Dayjs | null>(dayjs());

  useEffect(() => {
    if (dateTime) {
      const timestamp = convertToTimestamp(
        dateTime.format("YYYY-MM-DD"),
        dateTime.format("HH:mm:ss")
      );
      fetchData(timestamp);
    }
  }, [dateTime]);

  const fetchData = async (timestamp: number) => {
    try {
      const result = await getHeatmapData(timestamp);
      setData(result);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const handleDateChange = (newDate: Dayjs | null) => {
    setDateTime(newDate);
  };

  const layer = new HexagonLayer({
    id: "HexagonLayer",
    data: data.flatMap((d) =>
      d.park.entrances.map((entrance) => ({
        ...d,
        COORDINATES: [entrance.lon, entrance.lat],
      }))
    ),
    extruded: true,
    getPosition: (d: any) => d.COORDINATES,
    getColorWeight: (d: any) => d.busyness,
    getElevationWeight: (d: any) => d.busyness,
    elevationScale: 4,
    radius: 150,
    pickable: true,
  });

  return (
    <div>
      <div className="date-time-picker-container">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Controlled picker"
            value={dateTime}
            onChange={(newValue) => handleDateChange(newValue)}
          />
        </LocalizationProvider>
      </div>
      <DeckGL
        initialViewState={{
          longitude: -73.9712,
          latitude: 40.7831,
          zoom: 11,
          maxZoom: 20,
          pitch: 50,
          bearing: 20,
        }}
        controller={true}
        layers={[layer]}
        getTooltip={({ object }) => {
          if (object && object.park && object.park.parkName) {
            return `Park: ${object.park.parkName}`;
          }
          return null;
        }}
      >
        <StaticMap
          mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
          mapStyle="mapbox://styles/mapbox/dark-v11"
        />
      </DeckGL>
    </div>
  );
};

export default Heatmap;
