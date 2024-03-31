import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import VetAuthContext from "../contexts/VetContext"; // Importa el contexto del veterinario
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthFetched, user } = useContext(AuthContext);
  const { isAuthFetched: isVetAuthFetched, vet } = useContext(VetAuthContext); // Obtiene el estado de autenticación del veterinario y el objeto del veterinario

  // Verifica si la autenticación del usuario y del veterinario están completas
  if (!isAuthFetched || !isVetAuthFetched) {
    return <p>Loading...</p>;
  }

  // Verifica si el usuario o el veterinario no están autenticados y redirige en consecuencia
  if (!user && !vet) {
    return <Navigate to="/" replace />;
  }

  // Devuelve el contenido protegido si el usuario o el veterinario están autenticados
  return children;
};

export default ProtectedRoute;
