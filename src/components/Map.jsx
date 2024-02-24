import { useState } from "react";
import ReactMapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = () => {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

  return (
    <ReactMapGL
      {...viewport}
      mapboxAccessToken={
        "pk.eyJ1IjoiZG9nZmlsZSIsImEiOiJjbHN6dXUwNjEwaHdhMmxucmJqZzZ6cmtuIn0.ewRuBpz297DIvwMjqYls9Q"
      }
      onViewportChange={(viewport) => {
        setViewport(viewport);
      }}
    />
  );
};

export default Map;
