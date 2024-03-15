import { createHttp } from "./BaseService";

const http = createHttp(true);

export const getRecommendations = () => {
  return http.get("/recommendations");
};

export const recommendationCreate = (data) => {
  return http.post("/recommendations", data);
};
