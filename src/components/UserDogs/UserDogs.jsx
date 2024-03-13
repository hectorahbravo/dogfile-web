import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import "./UserDogs.css";

const UserDogs = () => {
  const { user } = useContext(AuthContext);

  // Función para renderizar un círculo con el avatar del perro o un círculo vacío con un símbolo de más
  const renderCircle = (index) => {
    if (index < user.dogs.length) {
      const dog = user.dogs[index];
      return (
        <Link
          key={dog.id}
          to={`/${user.id}/dogs/${dog.id}`}
          className="avatar-link"
        >
          <img className="avatar-preview" src={dog.avatar} alt={dog.name} />
          <p>{dog.name}</p>
        </Link>
      );
    } else {
      return (
        <Link
          key={index}
          to={`/create-dog/${user.id}`}
          className="avatar-link empty-circle"
        >
          <div className="avatar-preview empty-circle"></div>
          <p>+</p>
        </Link>
      );
    }
  };

  return (
    <div className="user-dogs-container">
      {/* Mapea los círculos con los avatares de los perros o círculos vacíos */}
      {Array.from({ length: 5 }, (_, index) => renderCircle(index))}
    </div>
  );
};

export default UserDogs;
