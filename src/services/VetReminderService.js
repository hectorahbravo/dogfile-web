import { createHttp } from "./BaseService";

const http = createHttp(true);

export const getVetReminders = () => {
  return http.get("/vetreminders");
};

export const vetReminderCreate = (data) => {
  return http.post("/vetreminders", data);
};

export const getVetRemindersDay = (date, userId) => {
  return http.get(`/vetreminders/day/${date}`, userId);
};

export const deleteVetReminder = (id) => {
  return http.delete(`/vetreminders/${id}`);
}
