import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./contexts/AuthContext.jsx";
import { DogContextProvider } from "./contexts/DogContext.jsx";
import { VetAuthContextProvider } from "./contexts/VetContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <DogContextProvider>
          <VetAuthContextProvider>
          <App />
          </VetAuthContextProvider>
        </DogContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
