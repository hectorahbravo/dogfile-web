import { createHttp } from "./BaseService";

const http = createHttp();

export const register = (data) => {
  return http.post("/users", data);
};

export const login = (data) => {
  return http.post("/login", data);
};


export const registerVet = (data) => {
  return http.post("/register/vets", data);
};

export const loginVet = (data) => {
  return http.post("/login/vets", data);
};