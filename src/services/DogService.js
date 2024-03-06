import { createHttp } from "./BaseService";

const http = createHttp(true);

export const getDog = (id, dogId) => {
  return http.get(`/users/${id}/dogs/${dogId}`);
};

export const createDog = (dogData) => {
  return http.post(`/users/${dogData.owner}/dogs`, dogData);
};

export const editDog = (id, dogId) => {
  return http.put(`/users/${id}/dogs/${dogId}`);
};

export const deleteDog = (id, dogId) => {
  return http.delete(`/users/${id}/dogs/${dogId}`);
};