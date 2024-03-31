import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { loginVet as loginVetService } from "../services/AuthService"; // Asegúrate de importar el servicio de autenticación para veterinarios
import { getAccessToken, setAccessToken } from "../stores/AccessTokenStore";
import { getCurrentVet } from "../services/VetService"; // Asegúrate de importar el servicio para obtener el veterinario actual
import { useLocation } from "react-router-dom";

const VetAuthContext = createContext();

export default VetAuthContext;

export const VetAuthContextProvider = ({ children }) => {
  const { pathname } = useLocation();
  const [vet, setVet] = useState(null);
  const [isAuthFetched, setIsAuthFetched] = useState(false);

  const fetchCurrentVet = useCallback(() => {
    getCurrentVet()
      .then((vet) => {
        setVet(vet);
        setIsAuthFetched(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const loginVet = useCallback(
    (data) => {
      return loginVetService(data)
        .then((response) => {
          // Guarda el token de acceso en el store
          setAccessToken(response.accessToken);
        })
        .then(() => {
          fetchCurrentVet();
        })
        .catch((err) => console.error(err));
    },
    [fetchCurrentVet]
  );

  useEffect(() => {
    if (getAccessToken()) {
      fetchCurrentVet();
    } else {
      if (pathname !== "/login/vets") {
        setIsAuthFetched(true);
      } else {
        setIsAuthFetched(false);
      }
    }
  }, [fetchCurrentVet, pathname]);

  const contextValue = useMemo(
    () => ({
      isAuthFetched,
      vet,
      loginVet,
      fetchCurrentVet
    }),
    [isAuthFetched, vet, loginVet, fetchCurrentVet]
  );

  return (
    <VetAuthContext.Provider value={contextValue}>
      {children}
    </VetAuthContext.Provider>
  );
};
