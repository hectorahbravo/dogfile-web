import { useRef, useEffect, useState, useContext } from "react";
import mapboxgl from "mapbox-gl";
import { useFormik } from "formik";
import { number, object, string } from "yup";
import Input from "./Input/Input";
import Button from "./Button/Button";
import "../components/Button/Button.css";
import AuthContext from "../contexts/AuthContext";
import { recommendationCreate } from "../services/RecommendationService";
import "./Recommendation.css";
import "../components/Input/Input.css";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
mapboxgl.accessToken =
  "pk.eyJ1IjoiZG9nZmlsZSIsImEiOiJjbHRvcHQweDgwaXh3MmptZXVwNnBmY3UyIn0.xyszSwJvLRUMFHKtIPb0ew";


const recommendationSchema = object({
  title: string().required("El título es obligatorio"),
  description: string().required("La descripción es obligatoria"),
  location: string().required("El lugar es obligatorio"),
  latitude: number().required("La latitud es obligatoria"),
  longitude: number().required("La longitud es obligatoria"),
});

const Recommendation = () => {
  const navigate = useNavigate();
  const mapContainer = useRef(null);
  const [lng, setLng] = useState(-3.703462);
  const [lat, setLat] = useState(40.416816);
  const [zoom, setZoom] = useState(16);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const { user } = useContext(AuthContext);
  const {
    values,
    errors,
    touched,
    isValid,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      title: "",
      description: "",
      location: "",
      latitude: null,
      longitude: null,
      image: "",
      user: "",
    },
    onSubmit: (values) => {
      recommendationCreate({
        ...values,
        latitude: values.latitude,
        longitude: values.longitude,
        user: user.id,
      });
      navigate("/maps");
    },
    validationSchema: recommendationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
  });

  useEffect(() => {
    if (!mapContainer.current) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLng(longitude);
        setLat(latitude);

        const mapInstance = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v12",
          center: [longitude, latitude],
          zoom: 16,
        });

        mapInstance.on("click", (e) => {
          const { lng, lat } = e.lngLat;

          setFieldValue("latitude", lat);
          setFieldValue("longitude", lng);

          removeMarkers();

          const newMarker = new mapboxgl.Marker({ color: "green" })
            .setLngLat([lng, lat])
            .addTo(mapInstance);
          setMarker(newMarker);
        });

        setMap(mapInstance);
      },
      (error) => {
        console.error("Error obteniendo la ubicación:", error);
      }
    );
  }, []);

  const removeMarkers = () => {
    setMarker((prevValue) => {
      if (prevValue) {
        prevValue.remove();
      }
      return null;
    });
  };

  return (
    <div className="recommendation-form-container">
      <Link to={"/maps"} className="exit-arrow">
        <FaArrowLeft />
      </Link>
      <h2>Nueva recomendacion</h2>
      <div
        ref={mapContainer}
        className="only-map-container"
        style={{ height: "400px" }}
      ></div>
      <div className="form-recommendation">
        {errors.longitude && <p>Selecciona un punto en el mapa</p>}
        <form onSubmit={handleSubmit}>
          <Input
            label="Título"
            name="title"
            type="text"
            placeholder="Ingrese el título"
            value={values.title}
            error={touched.title && errors.title}
            onChange={handleChange}
            onBlur={handleBlur}
            className="login-form"
          />
          <Input
            label="Descripción"
            name="description"
            type="text"
            placeholder="Ingrese la descripción"
            value={values.description}
            error={touched.description && errors.description}
            onChange={handleChange}
            onBlur={handleBlur}
            className="login-form"
          />
          <Input
            label="Lugar"
            name="location"
            type="text"
            placeholder="Ingrese el lugar"
            value={values.location}
            error={touched.location && errors.location}
            onChange={handleChange}
            onBlur={handleBlur}
            className="login-form"
          />
          <Button
            type="submit"
            className="btn-login btn-new-recommendation"
            text="Recomendar"
            disabled={!isValid}
          />
        </form>
      </div>
    </div>
  );
};

export default Recommendation;
