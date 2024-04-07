import { useContext, useEffect, useState } from "react";
import ReactCalendar from "react-calendar";
import AuthContext from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";
import NextReminders from "./NextReminders";
import "react-calendar/dist/Calendar.css";
import "./RemindersCalendar.css";

function RemindersCalendar() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    if (user && user.reminders) {
      setReminders(user.reminders);
    }
  }, [user]);

  const updateReminders = (newReminderList) => {
    setReminders(newReminderList);
  };

  const handleClickDay = (date) => {
    const formattedDate = formatDate(date);
    navigate(`/calendar/day/${formattedDate}`);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const tileContent = ({ date, view }) => {
    if (view === "month" && reminders.length > 0) {
      const currentDate = new Date(date);
      const eventsOnDay = reminders.filter((reminder) => {
        const reminderDate = new Date(reminder.startDate);
        const endDate = new Date(reminder.endDate);
        if (reminder.repeat) {
          if (reminder.frequency === "daily") {
            return (
              (currentDate >= reminderDate ||
                currentDate.toDateString() === reminderDate.toDateString()) &&
              currentDate <= endDate
            );
          } else if (reminder.frequency === "weekly") {
            if (currentDate.getDay() === reminderDate.getDay()) {
              const weeksDifference = Math.floor(
                (currentDate - reminderDate) / (7 * 24 * 60 * 60 * 1000)
              );
              if (currentDate.getDate() === reminderDate.getDate()) {
                return true;
              }
              if (
                weeksDifference >= 0 &&
                (!reminder.endDate || currentDate <= new Date(reminder.endDate))
              ) {
                return true;
              }
            }
          } else if (reminder.frequency === "monthly") {
            return (
              currentDate.getDate() === reminderDate.getDate() &&
              currentDate <= endDate
            );
          } else if (reminder.frequency === "annually") {
            return (
              currentDate.getDate() === reminderDate.getDate() &&
              currentDate.getMonth() === reminderDate.getMonth() &&
              currentDate.getFullYear() >= reminderDate.getFullYear() &&
              currentDate <= endDate
            );
          }
        } else {
          return currentDate.toDateString() === reminderDate.toDateString();
        }
      });

      return (
        <div className="tile-content-container">
          <div className="icons-calendar">
            {eventsOnDay.map((event, index) => (
              <span key={index}>
                {event.icon === "icon1" && "💊"}
                {event.icon === "icon2" && "💉"}
                {event.icon === "icon3" && "🏥"}
                {event.icon === "icon4" && "🪮"}
              </span>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="reminders-page">
      {user === null || user.reminders === null ? (
        <div>Cargando...</div>
      ) : (
        <>
          <h2>Recordatorios</h2>
          <div className="react-calendar">
            <ReactCalendar
              onClickDay={handleClickDay}
              tileContent={tileContent}
              minDate={new Date()}
              view="month"
            />
          </div>
          <Link className="reminder-new" to="/reminder/new">
            Nuevo recordatorio
            <IoMdAddCircleOutline />
          </Link>
          <NextReminders
            reminders={user.reminders}
            updateReminders={updateReminders}
          />
        </>
      )}
    </div>
  );
}

export default RemindersCalendar;
