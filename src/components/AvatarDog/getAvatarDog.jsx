import { getDog } from "../../services/DogService";

const getAvatarDog = ({ dog }) => {
  return getDog(dog.userId, dog.dogId)
    .then(dogData => {
      return dogData.avatar;
    })
    .catch(error => {
      console.error("Error fetching dog avatar:", error);
      return null;
    });
};

export default getAvatarDog;