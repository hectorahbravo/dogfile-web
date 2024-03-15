import { useNavigate, useParams } from "react-router-dom";
import CreateDog from "../../components/CreateDog/CreateDog";
import { useContext, useEffect, useState } from "react";
import { editDog, getDog, deleteDog } from "../../services/DogService";
import { FaTrash } from "react-icons/fa";
import Button from "../../components/Button/Button";
import '../../components/Button/Button.css'
import "../../components/DogProfile/DogProfile.css";
import DogContext from "../../contexts/DogContext";
import './EditDogProfile.css'
// Importa la función para formatear la fecha

function formatDate(dateString) {
  const dateObject = new Date(dateString);
  const day = dateObject.getDate().toString().padStart(2, "0");
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObject.getFullYear();
  return `${year}-${month}-${day}`;
}
const EditDog = () => {
  const { fetchDogProfile } = useContext(DogContext);
  const { userId, dogId } = useParams();
  const navigate = useNavigate();

  const [dog, setDog] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getDog(userId, dogId)
      .then((dogDB) => {
        // Formatear la fecha antes de actualizar el estado
        const formattedDog = {
          ...dogDB,
          birthdate: formatDate(dogDB.birthdate),
        };
        setDog(formattedDog);
      })
      .catch((error) => {
        console.error("Error fetching dog:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId, dogId]);

  const onSubmit = (values) => {
    return editDog(userId, dogId, values)
      .then((editedDog) => {
        fetchDogProfile(userId, dogId);
        navigate(`/dogs/${editedDog.id}`);
      })
      .catch((error) => {
        console.error("Error editing dog:", error);
      });
  };

  const onDelete = () => {
    if (
      window.confirm(
        "¿Estás seguro de que deseas eliminar este perfil de perro?"
      )
    ) {
      deleteDog(userId, dogId)
        .then(() => {
          navigate(`/user`);
        })
        .catch((error) => {
          console.error("Error deleting dog:", error);
        });
    }
  };

  return (
    <div className="background">
    <div className="edit-profile-container">
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <CreateDog
            initialValues={dog || {}}
            onSubmit={onSubmit}
            isEdit={true}
          />
          <div className="delete-container">
          <Button className="btn-delete" onClick={onDelete} text={"🗑️"}>
          </Button> </div>
        </>
        
      )}
    </div>
    </div>
  );
};

export default EditDog;
