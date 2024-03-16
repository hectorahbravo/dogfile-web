import "./NextReminders.css";
import Button from "../../components/Button/Button";
import { deleteReminder } from "../../services/ReminderService";
import { useNavigate } from "react-router-dom";

function NextReminders({ reminders }) {
  const navigate = useNavigate();
  const onDelete = (id) => {
    if (
      window.confirm("¿Estás seguro de que deseas eliminar este recordatorio?")
    ) {
      deleteReminder(id)
        .then(() => {
          navigate(`/reminders`);
        })
        .catch((error) => {
          console.error("Error deleting dog:", error);
        });
    }
  };
  const currentDate = new Date();
  const upcomingReminders = reminders
    ? reminders
        .filter((reminder) => {
          return (
            (!reminder.endDate || new Date(reminder.endDate) >= currentDate) &&
            new Date(reminder.startDate) >= currentDate
          );
        })
        .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
    : [];

  return (
    <div className="next-reminders-container">
      <h2 className="reminders-title">Próximos Recordatorios</h2>
      {upcomingReminders.length > 0 ? (
        upcomingReminders.map((reminder, index) => (
          <div className="reminder-card" key={index}>
            <div className="reminder-card-icons">
              {reminder.icon === "icon1" && "💊"}
              {reminder.icon === "icon2" && "💉"}
              {reminder.icon === "icon3" && "🏥"}
              {reminder.icon === "icon4" && "🪮"}
            </div>
            <div className="reminder-title-date-container">
              <h3>{reminder.title}</h3>
              <p>{new Date(reminder.startDate).toLocaleDateString()}</p>
            </div>
            <div className="reminder-card-hours">{reminder.hour}</div>
            <Button
              className="reminder-card-delete"
              onClick={() => {
                onDelete(reminder.id);
              }}
              text={"🗑️"}
            />
          </div>
        ))
      ) : (
        <p>No hay próximos recordatorios.</p>
      )}
    </div>
  );
}

export default NextReminders;
