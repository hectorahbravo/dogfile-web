import { createHttp } from "./BaseService";

const http = createHttp(true);

export const reminderCreate = (data) => {
  return http.post("/reminders", data);
};
