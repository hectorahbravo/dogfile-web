import { NavLink } from "react-router-dom";
import './Navbar.css'
import { FaHome } from 'react-icons/fa';
import { FaMapMarkerAlt, FaCalendarAlt, FaCog } from "react-icons/fa";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";


const Navbar = () => {

  return (
    <nav className="navbar-container">
          <NavLink  to={"/"}>
      
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
