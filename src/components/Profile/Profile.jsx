import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom
import "./Profile.css";
import "../../pages/Register/Register.css";

const Profile = ({ user }) => {
  return (
    <div className="welcome">
      <div className="image-canva"></div>
      <h2>¡Hola @{user.username}!</h2>
      <Link to={`/create-dog/${user.id}`} className="create-dog-button">
        Crear Perro
      </Link>
    </div>
  );
};

export default Profile;
