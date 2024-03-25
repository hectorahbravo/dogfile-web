import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDog } from "../../services/DogService";
import "./DogProfile.css";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import DogContext from "../../contexts/DogContext";
import { formatFecha, calcularEdad } from "../../helpers/formatDate";

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
              <img
                src={dogProfile.avatar}
                alt="Dog Avatar"
                className="avatar"
              />
              <div className="pencil-circle">
                <Link to={`/users/${user.id}/dogs/${dogProfile.id}/edit`}>
                  <CiEdit className="pencil" />
                </Link>
              </div>
            </div>
            <div className="info-container">
              <div className="avatar-container-name">
                <p className="dog-name">{dogProfile.name}</p>
              </div>
              <div className="info-primer-container">
                <div className="info-box">
                  <h3>Mis datos</h3>
                  <p>
                    <span>Peso:</span> {dogProfile.weight} kg
                  </p>
                  <p>
                    <span>Fecha de nacimiento:</span>
                    {` ${formatFecha(dogProfile.birthdate)}
                    ${calcularEdad(dogProfile.birthdate)}`}
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

                <div className="info-box">
                  <h3>Mi comida</h3>
                  <p>
                    <span>Comida:</span> {dogProfile.foodType}
                  </p>
                  <p>
                    <span>Cantidad:</span> {dogProfile.foodKg} kg
                  </p>
                  <p>
                    <span>Veces al día:</span> {dogProfile.foodTimes}
                  </p>
                </div>
                <div className="info-box">
                  <h3>Mis alergias</h3>
                  <p> {dogProfile.allergies}</p>
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
        </div>
      )}
    </div>
  );
};

export default DogProfile;
