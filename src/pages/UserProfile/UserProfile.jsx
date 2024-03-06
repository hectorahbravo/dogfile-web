import { useContext } from "react"
import AuthContext from '../../contexts/AuthContext'
import Profile from '../../components/Profile/Profile'
import UserDogs from '../../components/UserDogs/UserDogs'
import './UserProfile.css'
import { Link } from "react-router-dom"
import Edit from '../../assets/images/editar-perfil.png'
import Contact from '../../assets/images/contacto.png'
import Logout from '../../assets/images/logout.png'
const UserProfile = () => {
  const { user } = useContext(AuthContext);

  return (
  <div className="background">
<div className="user-container">
    <Profile user={user}/>
  <div className="user-dogs">
    <UserDogs/>
    </div>
    </div>
    <div className="links-container">
  <div className="links-user-container">
    <div className="link-item">
      <img className="icon-links" src={Edit} alt="Editar perfil" />
      <div className="link-text">
        <Link to="/">Editar perfil</Link>
        <p className="arrow-link">></p>
      </div>
    </div>
    <div className="link-item">
      <img className="icon-links" src={Contact} alt="contacto" />
      <div className="link-text">
        <Link to="/">Contacto</Link>
        <p className="arrow-link">></p>
      </div>
    </div>
    <div className="link-item">
      <img className="icon-links" src={Logout} alt="salir" />
      <div className="link-text">
        <Link to="/">Salir</Link>
        <p className="arrow-link">></p>
      </div>
    </div>
    {/* Aquí puedes agregar más elementos similares para otros enlaces de editar perfil */}
  </div>
</div>
</div>

   
  )
}

export default UserProfile
