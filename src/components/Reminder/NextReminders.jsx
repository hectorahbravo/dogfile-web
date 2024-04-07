import { useState, useEffect } from "react";
import "./NextReminders.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { deleteReminder } from "../../services/ReminderService";
import { Link, useNavigate } from "react-router-dom";

function NextReminders({ reminders, updateReminders }) {
  const navigate = useNavigate();
  const [reminderList, setReminderList] = useState(reminders);

  const onDelete = (id) => {
    if (
      window.confirm("¿Estás seguro de que deseas eliminar este recordatorio?")
    ) {
      deleteReminder(id)
        .then(() => {
          const newReminderList = reminderList.filter(
            (reminder) => reminder.id !== id
          );
          setReminderList(newReminderList);
          navigate(`/reminders`);
          // Llamar a la función de actualización en RemindersCalendar
          updateReminders(newReminderList);
        })
        .catch((error) => {
          console.error("Error deleting reminder:", error);
        });
    }
  };

  useEffect(() => {
    setReminderList(reminders);
  }, [reminders]);

  return (
    <div className="next-reminders-container">
      <h2 className="reminders-title">Próximos Recordatorios</h2>
      {reminderList.length > 0 ? (
        reminderList
          .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
          .map((reminder, index) => (
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
              <Link
                onClick={() => onDelete(reminder.id)}
                className="btn-delete-day"
              >
                <FaRegTrashAlt />
              </Link>
            </div>
          ))
      ) : (
        <p>No hay próximos recordatorios.</p>
      )}
    </div>
  );
}

export default NextReminders;
