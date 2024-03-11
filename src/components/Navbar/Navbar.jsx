import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { FaMapMarkerAlt, FaCalendarAlt, FaCog } from "react-icons/fa";
import { useContext } from "react";
import DogContext from "../../contexts/DogContext";

const Navbar = () => {
  const { dogProfile } = useContext(DogContext);

  return (
    <nav className="navbar-container">
      {/* Avatar del perfil del perro o un círculo si no hay perfil */}
      {dogProfile ? (
        <NavLink to={"/"}>
          <img
            src={dogProfile.avatar}
            alt="dog_profile_image"
            className="navbar-icons"
          />
        </NavLink>
      ) : (
        <div className="navbar-icons placeholder-circle"></div>
      )}

      <NavLink to={"/"}>
        <FaMapMarkerAlt className="navbar-icons" color="grey" />
      </NavLink>
      <NavLink to={"/reminders"}>
        <FaCalendarAlt className="navbar-icons" color="grey" />
      </NavLink>
      <NavLink to={"/"}>
        <FaCog className="navbar-icons" color="grey" />
      </NavLink>
    </nav>
  );
};

export default Navbar;
