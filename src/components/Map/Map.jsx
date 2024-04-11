import { useRef, useEffect, useState } from "react";
import mapboxgl, { PositionOptions } from "mapbox-gl";
import { getReports } from "../../services/ReportService";
import { getRecommendations } from "../../services/RecommendationService";
import "./Map.css";
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
    Promise.all([getReports(), getRecommendations()])
      .then(([reportsData, recommendationsData]) => {
        setReports(reportsData);
        setRecommendations(recommendationsData);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
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

        const allMarkers = [...reports, ...recommendations];

        const newMarkers = allMarkers.map((coord) => {
          const customPopup = `<div class="map-info-title">${coord.title}</div> <div class="map-info-description">${coord.description}</div><div class="map-info-location">${coord.location}</div><div class="map-username">${coord.user.username}</div> <img class="map-user-avatar" src=${coord.user.avatar}>`;
          const markerColor = coord.type === "report" ? "red" : "green";
          

          const marker = new mapboxgl.Marker({ color: markerColor })
            .setLngLat([coord.longitude, coord.latitude])
            .addTo(mapInstance);

          const popup = new mapboxgl.Popup({ offset: 20 }).setHTML(customPopup);
          marker.setPopup(popup);
          return { marker, popup };
        });

        console.log(allMarkers);
        setMap(mapInstance);
        setMarkers(newMarkers);
      },
      () => {
        const mapInstance = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v12",
          center: [DEFAULT_VALUES.lng, DEFAULT_VALUES.lat],
          zoom: DEFAULT_VALUES.zoom,
        });

        const newMarkers = reports.map((coord) => {
          const marker = new mapboxgl.Marker({ color: "red" })
            .setLngLat([coord.longitude, coord.latitude])
            .addTo(mapInstance);

          const popup = new mapboxgl.Popup({ offset: 25 }).setText();
          marker.setPopup(popup);
          return { marker, popup };
        });

        setMap(mapInstance);
        setMarkers(newMarkers);
      }
    );
  }, [reports, recommendations]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div
          ref={mapContainer}
          className="only-map-container"
          style={{ height: "400px" }}
        ></div>
      )}
    </div>
  );
}
