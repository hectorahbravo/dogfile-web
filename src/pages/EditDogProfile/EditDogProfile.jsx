import { useNavigate, useParams } from "react-router-dom";
import CreateDog from "../../components/CreateDog/CreateDog";
import { useEffect, useState } from "react";
import { editDog, getDog } from "../../services/DogService";

const EditDog = () => {
  const { userId, dogId } = useParams();
  const navigate = useNavigate();

  const [dog, setDog] = useState(null); // Inicializar como null en lugar de un objeto vacío
  const [loading, setLoading] = useState(false); // Inicializar como un booleano

  useEffect(() => {
    setLoading(true); // Indicar que la carga está en curso
    console.log('dogId', dogId)
    getDog(userId, dogId)
      .then((dogDB) => {
        console.log(dogDB)
        setDog(dogDB);
      })
      .catch(error => {
        console.error("Error fetching dog:", error);
      })
      .finally(() => {
        setLoading(false); // Indicar que la carga ha finalizado
      });
  }, [userId, dogId]);

  const onSubmit = (values) => {
    console.log(dogId)
    return editDog(userId, dogId, values)
      .then(editedDog => {
        navigate(`/dogs/${editedDog.id}`);
      })
      .catch(error => {
        console.error("Error editing dog:", error);
      });
  };

  return (
    <div>
      <h1>Editar Perfil</h1>

      {/* Crear un componente reutilizable con la lógica del formulario */}
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <CreateDog initialValues={dog || {}} onSubmit={onSubmit} isEdit={true} />
      )}
      
    </div>
  );
};

export default EditDog;
