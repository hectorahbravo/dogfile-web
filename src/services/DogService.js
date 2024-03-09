import { createHttp } from "./BaseService";

const http = createHttp(true);

export const getDog = (id, dogId) => {
  return http.get(`/users/${id}/dogs/${dogId}`);
};

export const createDog = (dogData) => {
  return http.post(`/users/${dogData.owner}/dogs`, dogData);
};

export const editDog = (body, id, dogId) => {
  return http.put(`/users/${id}/dogs/${dogId}`, body);
};

export const deleteDog = (userId, dogId) => {
  return http.delete(`/users/${userId}/dogs/${dogId}`);
};
