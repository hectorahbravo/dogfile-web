import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import './CalendarDay.css'
import { AiOutlinePlusCircle } from "react-icons/ai";
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
      } else if (reminder.frequency === "weekly") {
        const weekStartDate = new Date(startDate);
        while (weekStartDate.getDay() !== 0) {
          weekStartDate.setDate(weekStartDate.getDate() - 1);
        }
        const weekEndDate = new Date(weekStartDate);
        weekEndDate.setDate(weekEndDate.getDate() + 6);
        return checkDate >= weekStartDate && checkDate <= weekEndDate;
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
      <h2>{date}</h2>
      <div>
        <button className="round-button" onClick={() => changeDay(-1)}>Día anterior</button>
        <button className="round-button" onClick={() => changeDay(1)}>Siguiente día</button>
        <p><AiOutlinePlusCircle style={{ color: 'green' }}/> Añadir recordatorio</p>
      </div>
      <div>{hoursOfDay.map((hour) => renderHour(hour))}</div>
    </div>
  );
};

export default CalendarDay;
