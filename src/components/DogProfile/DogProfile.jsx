import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDog } from "../../services/DogService";
import "./DogProfile.css"; // Importa el archivo CSS para los estilos
import Pencil from "../../assets/images/pencil.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import DogContext from "../../contexts/DogContext";

export function formatFecha(fecha) {
  const date = new Date(fecha);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
}

const DogProfile = () => {
  const { user } = useContext(AuthContext);
  const { fetchDogProfile, dogProfile } = useContext(DogContext);
  const { userId, dogId } = useParams();
  const [dog, setDog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDogProfile(userId, dogId);
    getDog(userId, dogId)
      .then((dog) => {
        setDog(dog);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching dog:", error);
        setLoading(false);
      });
  }, [userId, dogId, fetchDogProfile]);

  return (
    <div>
      {dogProfile === null ? (
        <p>loading</p>
      ) : (
        <div className="background-dogprofile">
          <div className="dogprofile-container">
            <div className="avatar-container">
              <div className="avatar-container-name">
                <p className="dog-name">{dogProfile.name}</p>
                <div className="pencil-circle">
                  <Link to={`/users/${user.id}/dogs/${dogProfile.id}/edit`}>
                    <img className="pencil" src={Pencil} alt="editar-perfil" />
                  </Link>
                </div>
              </div>
              <img
                src={dogProfile.avatar}
                alt="Dog Avatar"
                className="avatar"
              />
            </div>
            <div className="info-container">
              <div className="info-primer-container">
                <div className="info-box">
                  <h3>Mis datos</h3>
                  <p>
                    <strong>Peso:</strong> {dogProfile.weight} kg
                  </p>
                  <p>
                    <strong>Fecha de nacimiento:</strong>{" "}
                    {formatFecha(dogProfile.birthdate)}
                  </p>
                </div>
                <div className="info-box">
                  <h3>Mis vacunas</h3>

                  <ul>
                    {dogProfile.vaccines.map((vaccine, index) => (
                      <li key={index}>{vaccine}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="info-primer-container">
                <div className="info-box">
                  <h3>Mi comida</h3>
                  <p>
                    <strong>Comida:</strong> {dogProfile.foodType}
                  </p>
                  <p>
                    <strong>Cantidad:</strong> {dogProfile.foodKg} kg
                  </p>
                  <p>
                    <strong>Veces al día:</strong> {dogProfile.foodTimes}
                  </p>
                </div>
                <div className="info-box">
                  <h3>Mis alergias</h3>
                  <p> {dogProfile.allergies}</p>
                </div>
              </div>
            </div>
            <div className="traits-container">
              <h2>¿Cómo soy?</h2>
              <div className="traits-box">
                <h3>Mi carácter</h3>
                <p>{dogProfile.temperament}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DogProfile;
