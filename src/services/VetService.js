import { createHttp } from "./BaseService";

const http = createHttp(true);

export const getCurrentVet = () => {
  return http.get("/vets/me");
};

export const getAllVets = () => {
  return http.get("/allvets");
};

export const getUsersAssociatedWithVet = (vetId) => {
  return http.get(`/${vetId}/users`);
};

export const getVet = (id) => {
  return http.get(`/vets/${id}`);
};

export const editVet = (vetId, body) => {
  return http.put(`vets/${vetId}`, body)
}

export const deleteVet = (id) => {
  return http.delete(`/vets/${id}`)
}

export const activateVet = (token) => {
  return http.get(`/activatevet/${token}`)
}

export const getDogsAssociatedWithVet = (vetId, data) => {
  return http.get(`/vets/${vetId}/dogs`, data)
}