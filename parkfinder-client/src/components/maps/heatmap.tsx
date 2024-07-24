import React from "react";
import DeckGL from "@deck.gl/react";
import { HexagonLayer } from "@deck.gl/aggregation-layers";
import StaticMap from "react-map-gl";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1Ijoic2hhbGluZXJhZ2h1cGF0aHkiLCJhIjoiY2x5d3dlbDl6MWw4ejJrcWw1OWZra2ZsdCJ9.yL_rEd23ge5wzMZxLAjprg"; // Replace with your Mapbox access token

type BusyRack = {
  ADDRESS: string;
  SPACES: number;
  COORDINATES: [number, number];
};

const Heatmap: React.FC = () => {
  const layer = new HexagonLayer<BusyRack>({
    id: "HexagonLayer",
    data: "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/sf-bike-parking.json",
    extruded: true,
    getPosition: (d: BusyRack) => d.COORDINATES,
    getColorWeight: (d: BusyRack) => d.SPACES,
    getElevationWeight: (d: BusyRack) => d.SPACES,
    elevationScale: 4,
    radius: 200,
    pickable: true,
  });

  return (
    <DeckGL
      initialViewState={{
        longitude: -122.4,
        latitude: 37.74,
        zoom: 11,
        pitch: 40.5,
        bearing: -27,
      }}
      controller={true}
      layers={[layer]}
    >
      <StaticMap
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/dark-v11"
      />
    </DeckGL>
  );
};

export default Heatmap;
