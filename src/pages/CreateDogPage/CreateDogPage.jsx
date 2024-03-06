import CreateDog from "../../components/CreateDog/CreateDog";
import { useParams } from "react-router-dom";


const CreateDogPage = () => {
    const { userId } = useParams(); // Obtener el userId usando useParams
  
    return (
      <div>
        {/* Renderizar CreateDog y pasar userId como prop */}
        <CreateDog userId={userId} />
      </div>
    );
  };

export default CreateDogPage;