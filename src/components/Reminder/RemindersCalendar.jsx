import ReactCalendar from "react-calendar";
import AuthContext from "../../contexts/AuthContext";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";
import NextReminders from "./NextReminders";
import "react-calendar/dist/Calendar.css";
import "./RemindersCalendar.css";


function RemindersCalendar() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

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
    if (view === "month" && user && user.reminders) {
      const currentDate = new Date(date);

      const eventsOnDay = user.reminders.filter((reminder) => {
        const reminderDate = new Date(reminder.startDate);
        const endDate = new Date(reminder.endDate);

        if (reminder.repeat) {
          if (reminder.frequency === "daily") {
            return currentDate >= reminderDate && currentDate <= endDate;
          } else if (reminder.frequency === "monthly") {
            return (
              currentDate.getDate() === reminderDate.getDate() &&
              currentDate >= reminderDate &&
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
          <div className="icons">
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
      {/* Si user.reminders es null, muestra un mensaje de carga */}
      {user === null && user.reminders === null ? (
        <div>Cargando...</div>
      ) : (
        <>
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
          <NextReminders reminders={user.reminders} />
        </>
      )}
    </div>
  );
}

export default RemindersCalendar;
