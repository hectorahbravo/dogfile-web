import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDog } from "../../services/DogService";
import "./DogProfile.css"; // Importa el archivo CSS para los estilos
import Pencil from "../../assets/images/pencil.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import DogContext from "../../contexts/DogContext";

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

  console.log(dogProfile);
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="background-dogprofile">
      <div className="dogprofile-container">
        <div className="avatar-container">
          <div className="avatar-container-name">
            <p className="dog-name">{dog.name}</p>
            <div className="pencil-circle">
              <Link to={`/users/${user.id}/dogs/${dog.id}/edit`}>
                <img className="pencil" src={Pencil} alt="editar-perfil" />
              </Link>
            </div>
          </div>
          <img src={dogProfile.avatar} alt="Dog Avatar" className="avatar" />
        </div>
        <div className="info-container">
          <div className="info-primer-container">
            <div className="info-box">
              <h3>Mis datos</h3>
              <p>
                <strong>Peso:</strong> {dog.weight} kg
              </p>
              <p>
                <strong>Fecha de nacimiento:</strong> {dog.birthdate}
              </p>
            </div>
            <div className="info-box">
              <h3>Mis vacunas</h3>

              <ul>
                {dog.vaccines.map((vaccine, index) => (
                  <li key={index}>{vaccine}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="info-primer-container">
            <div className="info-box">
              <h3>Mi comida</h3>
              <p>
                <strong>Comida:</strong> {dog.foodType}
              </p>
              <p>
                <strong>Cantidad:</strong> {dog.foodKg} kg
              </p>
              <p>
                <strong>Veces al día:</strong> {dog.foodTimes}
              </p>
            </div>
            <div className="info-box">
              <h3>Mis alergias</h3>
              <p> {dog.allergies}</p>
            </div>
          </div>
        </div>
        <div className="traits-container">
          <h2>¿Cómo soy?</h2>
          <div className="traits-box">
            <h3>Mi carácter</h3>
            <p>{dog.temperament}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DogProfile;
