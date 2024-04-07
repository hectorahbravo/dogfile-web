import CreateDog from "../../components/CreateDog/CreateDog";
import { useParams } from "react-router-dom";

const CreateDogPage = () => {
  const { userId } = useParams();

  return (
    <div>
      <CreateDog userId={userId} />
    </div>
  );
};

export default CreateDogPage;
