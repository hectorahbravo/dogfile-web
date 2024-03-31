import { useContext } from "react";
import VetContext from "../../contexts/VetContext";
import VetProfile from "../../components/VetProfile/VetProfile";
import "./VetProfilePage.css";
import { Link } from "react-router-dom";
import { deleteVet } from "../../services/VetService";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { logout } from "../../stores/AccessTokenStore";
import { GrEdit } from "react-icons/gr";
import { IoMailOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";

const VetProfilePage = () => {
  const { vet } = useContext(VetContext);
  const navigate = useNavigate();

  // Verificación de nulidad para evitar errores si vet es null
  if (!vet) {
    return null; // O cualquier otro comportamiento que desees en este caso
  }

  const onDelete = () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta cuenta?")) {
      deleteVet(vet.id)
        .then(() => {
          navigate(`/`);
        })
        .catch((error) => {
          console.error("Error deleting dog:", error);
        });
    }
  };
  
  return (
    <div className="background-userprofile">
      <div className="userprofile-container">
        <div className="user-container">
          <VetProfile vet={vet} />
        </div>
        <div className="links-container">
          <div className="links-user-container">
            <div className="link-item">
              <Link to={`/vets/${vet.id}/edit`} className="icon-link">
                <div className="container-icon">
                  <GrEdit className="icon-links" />
                </div>
                <div className="link-text">Editar perfil</div>
                <p className="arrow-link">&rarr;</p>
              </Link>
            </div>
            <div className="link-item">
              <Link to="/" className="icon-link">
                <div className="container-icon">
                  <IoMailOutline className="icon-links" />
                </div>
                <div className="link-text">Enviar recordatorio</div>
                <p className="arrow-link">&rarr;</p>
              </Link>
            </div>
            <div className="link-item">
              <button className="icon-link" onClick={logout}>
                <div className="container-icon">
                  <LuLogOut className="icon-links" />
                </div>
                <div className="link-text">Logout</div>
                <p className="arrow-link">&rarr;</p>
              </button>
            </div>
            <div className="link-item">
              <button className="icon-link" onClick={onDelete}>
                <div className="container-icon">
                  <RiDeleteBin6Line className="icon-links" />
                </div>
                <div className="link-text">Borrar tu cuenta</div>
                <p className="arrow-link">&rarr;</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VetProfilePage;
