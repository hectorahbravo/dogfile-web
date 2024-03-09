import { createHttp } from "./BaseService";

const http = createHttp(true);

export const reportCreate = (data) => {
  return http.post("/reports", data);
};

export const getReports = () => {
  return http.get("/reports");
};
