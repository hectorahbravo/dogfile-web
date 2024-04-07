import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthFetched, user } = useContext(AuthContext);
  // Verifica si la autenticación del usuario y del veterinario están completas
  if (!isAuthFetched) {
    return <p>Loading...</p>;
  }

  // Verifica si el usuario o el veterinario no están autenticados y redirige en consecuencia
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Devuelve el contenido protegido si el usuario o el veterinario están autenticados
  return children;
};

export default ProtectedRoute;
