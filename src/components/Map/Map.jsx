import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { getReports } from "../../services/ReportService";
import { getRecommendations } from "../../services/RecommendationService";

import "./Map.css";
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;


const DEFAULT_VALUES = {
  lng: -3.703462,
  lat: 40.416816,
  zoom: 13,
};

export default function Map() {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]); // 👈 control de markers

  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  // 🔐 Token
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

  // 📦 Fetch datos
  useEffect(() => {
    let isMounted = true;

    Promise.all([getReports(), getRecommendations()])
      .then(([reportsData, recommendationsData]) => {
        if (!isMounted) return;
        setReports(reportsData || []);
        setRecommendations(recommendationsData || []);
      })
      .catch(console.error)
      .finally(() => isMounted && setLoading(false));

    return () => {
      isMounted = false;
    };
  }, []);

  // 🗺️ Inicializar mapa (una sola vez)
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const initMap = (lng, lat) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [lng, lat],
        zoom: DEFAULT_VALUES.zoom,
      });

      map.on("load", () => {
        map.resize(); // asegura render correcto
      });

      mapRef.current = map;
    };

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => initMap(coords.longitude, coords.latitude),
      () => initMap(DEFAULT_VALUES.lng, DEFAULT_VALUES.lat)
    );

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // 📍 Render markers (controlados)
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // 🧹 limpiar markers anteriores
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const data = [...reports, ...recommendations];

    data.forEach((coord) => {
      if (!coord?.longitude || !coord?.latitude) return;

      const popupHTML = `
        <div class="map-info-title">${coord.title || ""}</div>
        <div class="map-info-description">${coord.description || ""}</div>
        <div class="map-info-location">${coord.location || ""}</div>
        <div class="map-username">${coord.user?.username || "Anon"}</div>
        ${coord.user?.avatar
          ? `<img class="map-user-avatar" src="${coord.user.avatar}" />`
          : ""
        }
      `;

      const marker = new mapboxgl.Marker({
        color: coord.type === "report" ? "red" : "green",
      })
        .setLngLat([coord.longitude, coord.latitude])
        .setPopup(new mapboxgl.Popup({ offset: 20 }).setHTML(popupHTML))
        .addTo(map);

      markersRef.current.push(marker);
    });
  }, [reports, recommendations]);

  return (
    <div style={{ position: "relative" }}>
      {loading && <div>Loading...</div>}

      {/* 👇 SIEMPRE presente */}
      <div
        ref={mapContainer}
        className="only-map-container"
        style={{ height: "400px", width: "100%" }}
      />
    </div>
  );
}