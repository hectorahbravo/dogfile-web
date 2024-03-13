import { useContext } from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import AuthContext from "../../contexts/AuthContext";
import "./RemindersCalendar.css";
import { useNavigate } from "react-router-dom";

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
        <>
          {eventsOnDay.map((event, index) => (
            <div key={index}>{event.icon}</div>
          ))}
        </>
      );
    }
  };

  return (
    <div className="react-calendar">
      <ReactCalendar
        onClickDay={handleClickDay}
        tileContent={tileContent}
        minDate={new Date()}
      />
    </div>
  );
}

export default RemindersCalendar;
