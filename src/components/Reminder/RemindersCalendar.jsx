import { useContext, useState, useEffect } from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import AuthContext from "../../contexts/AuthContext";
import "./RemindersCalendar.css";

function RemindersCalendar() {
  const { user } = useContext(AuthContext);
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    if (user && user.reminders) {
      setReminders(user.reminders);
    }
  }, [user]);

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const currentDate = new Date(date);

      const eventsOnDay = reminders.filter((reminder) => {
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
          {eventsOnDay.map((event) => (
            <>
              <div>{event.icon}</div>
              <div>{event.title}</div>
            </>
          ))}
        </>
      );
    }
  };

  return (
    <div className="react-calendar">
      <ReactCalendar tileContent={tileContent} />
    </div>
  );
}

export default RemindersCalendar;
