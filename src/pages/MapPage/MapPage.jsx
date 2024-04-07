import Map from "../../components/Map/Map";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import "./MapPage.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
const MapPage = () => {
  return (
    <div className="background-map">
      <div className="map-page">
        <h2>Mapas</h2>
        <div className="map-container">
          <Map />
          <h2 className="map-title">Alertas y recomendaciones</h2>
          <p className="text-map">
            ¿Quieres dar un paseo con tu perro y no sabes dónde? Aquí puedes
            encontrar todas las recomendaciones de sitios para ir con perros de
            los usuarios, y todas las alertas en sitios que pueden poner en
            peligro a tu mascota.
          </p>
        </div>
        <div className="map-info-container">
          <Link className="add-link" to={"/reports/new"}>
            <div className="btn-sign leyend">
              <p>
                <FaMapMarkerAlt color="red" />
                Reportar
              </p>
            </div>
          </Link>
          <Link className="add-link" to={"/recommendation/new"}>
            <div className="btn-sign leyend">
              <p>
                <FaMapMarkerAlt color="green" />
                Recomedar
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
