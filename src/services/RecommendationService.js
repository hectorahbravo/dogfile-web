import { createHttp } from "./BaseService";

const http = createHttp(true);

export const getRecommendation = () => {
  return http.get("/reminders");
};

export const recommendationCreate = (data) => {
  return http.post("/recommendations", data);
};
