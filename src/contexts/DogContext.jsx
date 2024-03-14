import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getDog } from "../services/DogService"; // Importa el servicio para obtener el perfil del perro
import AuthContext from "./AuthContext";

const DogContext = createContext();

export default DogContext; // Hook personalizado para acceder al contexto del perro

export const DogContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [selectedDogId, setSelectedDogId] = useState(null);
  const [dogProfile, setDogProfile] = useState(null);
  const [isDogProfileFetched, setIsDogProfileFetched] = useState(false);

  // Función para obtener el perfil del perro
  const fetchDogProfile = useCallback(
    (userId, dogId) => {
      if (dogId) {
        getDog(userId, dogId)
          .then((profile) => {
            setDogProfile(profile);
            setIsDogProfileFetched(true);
          })
          .catch((err) => {
            setIsDogProfileFetched(true); // En caso de error, marcamos como perfil obtenido para evitar bucles de solicitud
          });
      }
    },
    [selectedDogId]
  );
  useEffect(() => {
    if (user && user.dogs && user.dogs.length > 0) {
      fetchDogProfile(user.id, selectedDogId);
    } else {
      setIsDogProfileFetched(true); // Marcar como perfil obtenido si no es necesario obtenerlo
    }
  }, [fetchDogProfile, user, selectedDogId]);
  const contextValue = useMemo(
    () => ({
      dogProfile,
      isDogProfileFetched,
      fetchDogProfile,
    }),
    [dogProfile, isDogProfileFetched, fetchDogProfile]
  );
  return (
    <DogContext.Provider value={contextValue}>{children}</DogContext.Provider>
  );
};
