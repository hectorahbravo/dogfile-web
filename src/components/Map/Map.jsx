import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { getReports } from "../../services/ReportService";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZG9nZmlsZSIsImEiOiJjbHRrMjZjMzIwdGk3Mmtxb3RsMjNvZWZhIn0.iwiwLx0iNECX9mWSKOTANA";

const DEFAULT_VALUES = {
  lng: -3.703462,
  lat: 40.416816,
  zoom: 13,
};

export default function Map() {
  const [loading, setLoading] = useState(true);
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [reports, setReports] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    getReports()
      .then((reports) => {
        setReports(reports);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false)); // Update loading state regardless of success or failure
  }, []);

  useEffect(() => {
    if (!mapContainer.current) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        const mapInstance = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/navigation-day-v1",
          center: [longitude, latitude],
          zoom: DEFAULT_VALUES.zoom,
        });

        const newMarkers = reports.map((coord) => {
          const marker = new mapboxgl.Marker()
            .setLngLat([coord.longitude, coord.latitude])
            .addTo(mapInstance);
          const popup = new mapboxgl.Popup({ offset: 25 }).setText(
            coord.description,
            coord.title
          );
          marker.setPopup(popup);
          return { marker, popup };
        });

        setMap(mapInstance);
        setMarkers(newMarkers);
      },
      () => {
        const mapInstance = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/navigation-day-v1",
          center: [DEFAULT_VALUES.lng, DEFAULT_VALUES.lat],
          zoom: DEFAULT_VALUES.zoom,
        });

        const newMarkers = reports.map((coord) => {
          const marker = new mapboxgl.Marker()
            .setLngLat([coord.longitude, coord.latitude])
            .addTo(mapInstance);
          const popup = new mapboxgl.Popup({ offset: 25 }).setText(
            `<p>${coord.description}</p>`
          );
          marker.setPopup(popup);
          return { marker, popup };
        });

        setMap(mapInstance);
        setMarkers(newMarkers);
      }
    );
  }, [reports]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div
          ref={mapContainer}
          style={{ height: "400px" }}
        ></div>
      )}
    </div>
  );
}
