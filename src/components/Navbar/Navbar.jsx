import { NavLink } from "react-router-dom";
import './Navbar.css'
import { FaHome } from 'react-icons/fa';
import { FaMapMarkerAlt, FaCalendarAlt, FaCog } from "react-icons/fa";
import getAvatarDog from "../AvatarDog/getAvatarDog";

const Navbar = () => {
  return (
    <nav className="navbar-container">
          <NavLink  to={"/"}>
      <getAvatarDog className="navbar-icons" color="grey"/>
      </NavLink>
      <NavLink  to={"/"}>
      <FaHome className="navbar-icons" color="grey"/>
      </NavLink>
      <NavLink  to={"/"}>
      <FaMapMarkerAlt className="navbar-icons" color="grey"/>
      </NavLink>
      <NavLink  to={"/"}>
      <FaCalendarAlt className="navbar-icons" color="grey"/>
      </NavLink>
      <NavLink  to={"/"}>
      <FaCog className="navbar-icons" color="grey"/>
      </NavLink>
    </nav>

  )
}

export default Navbar