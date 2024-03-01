import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZG9nZmlsZSIsImEiOiJjbHN6dXUwNjEwaHdhMmxucmJqZzZ6cmtuIn0.ewRuBpz297DIvwMjqYls9Q";

const DEFAULT_VALUES = {
  lng: -3.703462,
  lat: 40.416816,
  zoom: 16,
};

const MARKER_COORDINATES = [
  { lng: -3.703462, lat: 40.416816, description: "Marker 1" },
  { lng: -3.704, lat: 40.417, description: "Marker 2" },
  { lng: -3.705, lat: 40.418, description: "Marker 3" },
  { lng: -3.702, lat: 40.415, description: "Marker 4" },
  { lng: -3.7033, lat: 40.4166, description: "Additional Marker 1" },
  { lng: -3.7038, lat: 40.4172, description: "Additional Marker 2" },
  { lng: -3.7041, lat: 40.4169, description: "Additional Marker 3" },
  { lng: -3.7037, lat: 40.4155, description: "Additional Marker 4" },
  { lng: -3.7025, lat: 40.4173, description: "Additional Marker 5" },
  { lng: -3.7044, lat: 40.4171, description: "Additional Marker 6" },
  { lng: -3.7047, lat: 40.4178, description: "Additional Marker 7" },
  { lng: -3.7039, lat: 40.4182, description: "Additional Marker 8" },
  { lng: -3.7032, lat: 40.4177, description: "Additional Marker 9" },
  { lng: -3.7031, lat: 40.4159, description: "Additional Marker 10" },
];

export default function Map() {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (!mapContainer.current) return;

    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/navigation-day-v1",
      center: [DEFAULT_VALUES.lng, DEFAULT_VALUES.lat],
      zoom: DEFAULT_VALUES.zoom,
    });

    const newMarkers = MARKER_COORDINATES.map((coord) => {
      const marker = new mapboxgl.Marker()
        .setLngLat([coord.lng, coord.lat])
        .addTo(mapInstance);
      const popup = new mapboxgl.Popup({ offset: 25 }).setText(
        coord.description
      );
      marker.setPopup(popup);
      return { marker, popup };
    });

    setMap(mapInstance);
    setMarkers(newMarkers);

    return () => {
      mapInstance.remove();
    };
  }, []);

  return (
    <div
      ref={mapContainer}
      className="map-container"
      style={{ height: "500px" }}
    ></div>
  );
}
