import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { FaMapMarkerAlt, FaCalendarAlt, FaCog, FaHome } from "react-icons/fa";
import { useContext } from "react";
import DogContext from "../../contexts/DogContext";
import AuthContext from "../../contexts/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const { dogProfile } = useContext(DogContext);

  return (
    <nav className="navbar-container">
      {dogProfile ? (
        <NavLink to={`/${user._id}/dogs/${dogProfile.id}`}>
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
      <NavLink to={"/reminders"}>
        <FaCalendarAlt className="navbar-icons" color="grey" />
      </NavLink>
      <NavLink to={"/user"}>
        <FaHome className="navbar-icons" color="grey" />
      </NavLink>
    </nav>
  );
};

export default Navbar;
