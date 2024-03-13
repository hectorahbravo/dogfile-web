import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { FaMapMarkerAlt, FaCalendarAlt, FaCog, FaHome} from "react-icons/fa";
import { useContext } from "react";
import DogContext from "../../contexts/DogContext";

const Navbar = () => {
  const { dogProfile } = useContext(DogContext);

  return (
    <nav className="navbar-container">
      {/* Avatar del perfil del perro o un círculo si no hay perfil */}
      {dogProfile ? (
        <NavLink to={`/${dogProfile.owner._id}/dogs/${dogProfile.dogId}`}>
          <img
            src={dogProfile.avatar}
            alt="dog_profile_image"
            className="navbar-icons"
          />
        </NavLink>
      ) : (
        <div className="navbar-icons placeholder-circle"></div>
      )}

      <NavLink to={"/maps"}>
        <FaMapMarkerAlt className="navbar-icons" color="grey" />
      </NavLink>
      <NavLink to={"/calendar"}>
        <FaCalendarAlt className="navbar-icons" color="grey" />
      </NavLink>
      <NavLink to={"/user"}>
        <FaHome className="navbar-icons" color="grey" />
      </NavLink>
    </nav>
  );
};

export default Navbar;
