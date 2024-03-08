import { createHttp } from "./BaseService";

const http = createHttp(true);

export const getReminders = () => {
  return http.get("/reminders");
};

export const reminderCreate = (data) => {
  return http.post("/reminders", data);
};
