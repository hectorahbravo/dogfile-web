import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDog } from "../../services/DogService";
import "./DogProfile.css"; // Importa el archivo CSS para los estilos
import Pencil from '../../assets/images/pencil.png'
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

const DogProfile = () => {
  const { user } = useContext(AuthContext);
  const { userId, dogId } = useParams();
  console.log(userId, dogId)
  const [dog, setDog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDog(userId, dogId)
      .then(dog => {
        setDog(dog);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching dog:", error);
        setLoading(false);
      });
  }, [userId, dogId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="dog-profile-container">
      <div className="avatar-container">
      <p className="dog-name">{dog.name}<Link to={`/users/${user.id}/dogs/${dog.id}/edit`}><img className="pencil" src={Pencil} alt="editar-perfil" /></Link></p>
      
        <img src={dog.avatar} alt="Dog Avatar" className="avatar" />
      </div>
      <div className="info-container">
        <div className="info-box">
          <h3>Mis datos</h3>
          <p><strong>Peso:</strong> {dog.weight} kg</p>
          <p><strong>Fecha de nacimiento:</strong> {dog.birthdate}</p>
        </div>
        <div className="info-box">
          <h3>Mis vacunas</h3>
          <p> {dog.vaccines}</p>
        </div>
        <div className="info-box">
          <h3>Mi comida</h3>
          <p><strong>Comida:</strong> {dog.foodType}</p>
          <p><strong>Cantidad:</strong> {dog.foodKg} kg</p>
          <p><strong>Veces al día:</strong> {dog.foodTimes}</p>
        </div>
        <div className="info-box">
          <h3>Mis alergias</h3>
          <p> {dog.allergies}</p>
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
  );
};

export default DogProfile;
