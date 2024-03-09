import { createHttp } from "./BaseService";

const http = createHttp(true);

export const getCurrentUser = () => {
  return http.get("/users/me");
};

export const getUser = (id) => {
  return http.get(`/users/${id}`);
};

export const getUserDogs = (userId, dogId) => {
  return http.get(`users/${userId}/dogs/${dogId}`);
};

export const editUser = (userId, body) => {
  return http.put(`users/${userId}`, body)
}

export const deleteUser = (id) => {
  return http.delete(`/users/${id}`)
}

export const activateUser = (token) => {
  return http.get(`/activate/${token}`)
}