import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  "pk.eyJ1IjoiZG9nZmlsZSIsImEiOiJjbHN6dXUwNjEwaHdhMmxucmJqZzZ6cmtuIn0.ewRuBpz297DIvwMjqYls9Q";

export default function Map() {
  const mapContainer = useRef(null);
  const [lng, setLng] = useState(-3.703462);
  const [lat, setLat] = useState(40.416816);
  const [zoom, setZoom] = useState(12);
  const [popup, setPopup] = useState(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    setMap(mapInstance);

    return () => mapInstance.remove();
  }, []);

  return (
    <div className="container">
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div
        ref={mapContainer}
        className="map-container"
        style={{ height: "500px" }}
      ></div>
    </div>
  );
}
