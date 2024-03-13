import { useRef, useEffect, useState, useContext } from "react";
import mapboxgl from "mapbox-gl";
import { useFormik } from "formik";
import { date, number, object, string } from "yup";
import Input from "./Input/Input";
import Button from "./Button/Button";
import { reportCreate } from "../services/ReportService";
import AuthContext from "../contexts/AuthContext";

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
      startDate: "",
      endDate: "",
      time: "",
      location: "",
      latitude: null,
      longitude: null,
      user: "",
    },
    onSubmit: (values) => {
      reportCreate({ ...values, user: user.id });
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

  return (
    <div>
      <div
        ref={mapContainer}
        className="map-container"
        style={{ height: "500px" }}
      ></div>
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
        />
        <Button type="submit" text="Reportar" disabled={!isValid} />
      </form>
    </div>
  );
};

export default Reports;
