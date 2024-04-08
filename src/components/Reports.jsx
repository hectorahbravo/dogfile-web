import { useRef, useEffect, useState, useContext } from "react";
import mapboxgl from "mapbox-gl";
import { useFormik } from "formik";
import { date, number, object, string } from "yup";
import Input from "./Input/Input";
import Button from "./Button/Button";
import { reportCreate } from "../services/ReportService";
import AuthContext from "../contexts/AuthContext";
import "./Reports.css";
import "../components/Input/Input.css";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { formatFecha } from "../helpers/formatDate";
import { Oval } from "react-loader-spinner";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZG9nZmlsZSIsImEiOiJjbHRvcHQweDgwaXh3MmptZXVwNnBmY3UyIn0.xyszSwJvLRUMFHKtIPb0ew";

const reportSchema = object({
  title: string().required("El título es obligatorio"),
  description: string().required("La descripción es obligatoria"),
  startDate: date().required("La fecha de inicio es obligatoria"),
  endDate: date().required("La fecha de fin es obligatoria"),
  time: string().required("La hora es obligatoria"),
  location: string().required("El lugar es obligatorio"),
  latitude: number().required("La latitud es obligatoria"),
  longitude: number().required("La longitud es obligatoria"),
});

const Reports = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const today = new Date();
  const [isSubmitting, setIsSubmitting] = useState(false); // Nuevo estado

  const mapContainer = useRef(null);
  const [lng, setLng] = useState(-3.703462);
  const [lat, setLat] = useState(40.416816);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

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
      startDate: formatFecha(new Date()),
      endDate: formatFecha(new Date()),
      time: "12:00",
      location: "",
      latitude: null,
      longitude: null,
      user: "",
    },
    onSubmit: (values) => {
      setIsSubmitting(true);
      reportCreate({ ...values, user: user.id })
        .then(() => {
          setIsSubmitting(false);
          navigate("/maps");
        })
        .catch((error) => {
          setIsSubmitting(false);
          console.error("Error al crear el reporte:", error);
        });
    },
    validationSchema: reportSchema,
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

          const newMarker = new mapboxgl.Marker()
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

  console.log(errors);

  return (
    <div className="recommendation-form-container">
      <Link to={"/maps"} className="exit-arrow">
        <FaArrowLeft />
      </Link>
      <h2>Nuevo Reporte</h2>
      <div
        ref={mapContainer}
        className="only-map-container"
        style={{ height: "400px" }}
      ></div>
      <div className="form-report">
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
            label="Fecha de inicio"
            name="startDate"
            type="date"
            placeholder="Seleccione la fecha de inicio"
            value={values.startDate}
            error={touched.startDate && errors.startDate}
            onChange={handleChange}
            onBlur={handleBlur}
            className="login-form"
          />
          <Input
            label="Fecha de fin"
            name="endDate"
            type="date"
            placeholder="Seleccione la fecha de fin"
            value={values.endDate}
            error={touched.endDate && errors.endDate}
            onChange={handleChange}
            onBlur={handleBlur}
            className="login-form"
          />
          <Input
            label="Hora"
            name="time"
            type="time"
            placeholder="Ingrese la hora"
            value={values.time}
            error={touched.time && errors.time}
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
            text={
              isSubmitting ? (
                <Oval
                  className="spiner"
                  visible={true}
                  height="25"
                  width="25"
                  color="white"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                "Reportar"
              )
            }
            className="btn-login btn-new-recommendation"
            disabled={!isValid || isSubmitting}
          />
        </form>
      </div>
    </div>
  );
};

export default Reports;
