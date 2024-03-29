import Map from "../../components/Map/Map";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import "./MapPage.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
const MapPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="background-map">
      <div className="map-page">
        <div className="map-container">
          <h2 className="map-title">Alertas y recomendaciones</h2>
          <p className="text-map">
            ¿Quieres dar un paseo con tu perro y no sabes dónde? Aquí puedes
            encontrar todas las recomendaciones de sitios para ir con perros de
            los usuarios, y todas las alertas en sitios que pueden poner en
            peligro a tu mascota.
          </p>
          <Map />
        </div>
        <div className="map-info-container">
          <div className="leyend">
            <p>
              <FaMapMarkerAlt color="red" /> Alertas recibidas de usuarios
            </p>
            <p>
              <FaMapMarkerAlt color="green" /> Sitios recomendados por usuarios
            </p>
          </div>

          <div className="text-add">
            <Link className="add-link" to={"/reports/new"}>
              <AiOutlinePlusCircle style={{ color: "red" }} /> Añadir alerta
            </Link>
            <Link className="add-link" to={"/recommendation/new"}>
              <AiOutlinePlusCircle style={{ color: "green" }} /> Añadir sitio
              recomendado
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
