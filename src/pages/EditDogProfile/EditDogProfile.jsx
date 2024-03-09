import { useNavigate, useParams } from "react-router-dom";
import CreateDog from "../../components/CreateDog/CreateDog";
import { useEffect, useState } from "react";
import { editDog, getDog, deleteDog } from "../../services/DogService";
import { FaTrash } from "react-icons/fa";
import '../../components/DogProfile/DogProfile.css'

const EditDog = () => {
  const { userId, dogId } = useParams();
  const navigate = useNavigate();

  const [dog, setDog] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getDog(userId, dogId)
      .then((dogDB) => {
        setDog(dogDB);
      })
      .catch(error => {
        console.error("Error fetching dog:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId, dogId]);

  const onSubmit = (values) => {
    return editDog(userId, dogId, values)
      .then(editedDog => {
        navigate(`/dogs/${editedDog.id}`);
      })
      .catch(error => {
        console.error("Error editing dog:", error);
      });
  };

  const onDelete = () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este perfil de perro?")) {
      deleteDog(userId, dogId)
        .then(() => {
          navigate(`/user`);
        })
        .catch(error => {
          console.error("Error deleting dog:", error);
        });
    }
  };

  return (
    <div className="dog-profile-container">
      <h1>Editar Perfil</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <CreateDog initialValues={dog || {}} onSubmit={onSubmit} isEdit={true} /><button onClick={onDelete}><FaTrash /></button>
          
        </>
      )}
    </div>
  );
};

export default EditDog;
