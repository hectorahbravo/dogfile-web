import { useNavigate, useParams } from "react-router-dom";
import CreateDog from "../../components/CreateDog/CreateDog";
import { useEffect, useState } from "react";
import { editDog, getDog } from "../../services/DogService"

const EditDog = () => {
  const { userId, dogId } = useParams();
  const navigate = useNavigate();

  const [dog, setDog] = useState({})
  const [loading, setLoading] = useState({})

  useEffect(() => {
    getDog(dogId)
      .then((dogDB) => {
        setDog(dogDB);
        setLoading(false);
      })
      .catch(error => console.log(error))
  }, [userId, dogId])

  const initialValues = {
    name: dog.name,
    birthdate: dog.birthdate,
    weight: dog.weight,
    vaccines: dog.vaccines,
    allergies: dog.allergies,
    foodType: dog.foodType,
    foodTimes: dog.foodTimes,
    foodKg: dog.foodKg,
    temperament: dog.temperament,
    avatar: dog.avatar,
  }

  const onSubmit = (values) => {
    return editDog(userId, dogId, values)
      .then(editedDog => {
        navigate(`/dogs/${editedDog.id}`)
      })
  }

  return (
    <div>
      <h1>Editar Perfil</h1>

      {/* Crear un componente reutilizable con la lógica del formulario */}
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <CreateDog initialValues={initialValues} onSubmit={onSubmit} />
      )}
      
    </div>
  )
}

export default EditDog;