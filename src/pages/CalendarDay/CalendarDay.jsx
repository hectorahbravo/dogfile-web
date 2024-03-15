import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

const CalendarDay = () => {
  const { user } = useContext(AuthContext);
  const { date } = useParams();
  const navigate = useNavigate();
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const remindersForDay = user.reminders.filter((reminder) => {
      const startDate = new Date(reminder.startDate);
      const endDate = new Date(reminder.endDate);
      const checkDate = new Date(date);

      if (reminder.frequency === "daily") {
        return checkDate >= startDate && checkDate <= endDate;
      } else if (reminder.frequency === "monthly") {
        return checkDate.getDate() === startDate.getDate();
      } else if (reminder.frequency === "annually") {
        return (
          checkDate.getMonth() === startDate.getMonth() &&
          checkDate.getDate() === startDate.getDate()
        );
      }

      return false;
    });

    setReminders(remindersForDay);
  }, [date, user.reminders]);

  const renderHour = (hour) => {
    const events = reminders.filter((reminder) => {
      const eventHour = parseInt(reminder.hour.split(":")[0]);
      return eventHour === parseInt(hour.split(":")[0]);
    });

    return (
      <div
        key={hour}
        style={{
          border: "1px solid #ccc",
          height: "60px",
          padding: "5px",
          marginBottom: "5px",
        }}
      >
        <p>{hour}</p>
        {events.map((event, index) => (
          <p key={index}>{event.title}</p>
        ))}
      </div>
    );
  };

  const changeDay = (amount) => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + amount);
    const formattedDate = currentDate.toISOString().split("T")[0];
    navigate(`/calendar/day/${formattedDate}`);
  };

  const hoursOfDay = Array.from(
    { length: 24 },
    (_, hour) => `${hour < 10 ? `0${hour}` : hour}:00`
  );

  return (
    <div>
      <h2>Day View</h2>
      <div>
        <button onClick={() => changeDay(-1)}>Previous Day</button>
        <button onClick={() => changeDay(1)}>Next Day</button>
      </div>
      <div>{hoursOfDay.map((hour) => renderHour(hour))}</div>

      {/* Enlace para volver a la página de recordatorios */}
      <Link to="/reminders">Volver a los recordatorios</Link>
    </div>
  );
};

export default CalendarDay;
