import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import Profile from "../../components/Profile/Profile";
import UserDogs from "../../components/UserDogs/UserDogs";
import "./UserProfile.css";
import { Link } from "react-router-dom";
import { deleteUser } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { logout } from "../../stores/AccessTokenStore";
import { GrEdit } from "react-icons/gr";
import { IoMailOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const onDelete = () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta cuenta?")) {
      deleteUser(user.id)
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
            <Profile user={user} />
            <div className="user-dogs">
              <UserDogs />
            </div>
          </div>
          <div className="links-container">
            <div className="links-user-container">
              <div className="link-item">
                <Link to={`/users/${user.id}/edit`} className="icon-link">
                  <div className="container-icon">
                    <GrEdit className="icon-links" />
                  </div>
                  <div className="link-text">Editar perfil</div>
                  <p className="arrow-link">&rarr;</p>
                </Link>
              </div>
              <div className="link-item">
                <Link to="/about-us" className="icon-link">
                  <div className="container-icon">
                    <IoMailOutline className="icon-links" />
                  </div>
                  <div className="link-text">Quiénes somos</div>
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

export default UserProfile;
