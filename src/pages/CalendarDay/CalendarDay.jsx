import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import './CalendarDay.css'
import { AiOutlinePlusCircle } from "react-icons/ai";
import { deleteReminder } from "../../services/ReminderService";
import Button from "../../components/Button/Button";
import '../../components/Button/Button.css'


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
          <div key={index} className='dayhour'>
          <p>{event.title}</p>
          
          <Button onClick={()=>onDelete(event.id)} text={"🗑️"} className="btn-delete" /></div>
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

  const onDelete = (id) => {
    if (
      window.confirm(
        "¿Estás seguro de que deseas eliminar este recordatorio?"
      )
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

  return (
    <div className="background-hours">
      <h2 className="date">{date}</h2>
      <div className="container-buttons">
        <button className="round-button" onClick={() => changeDay(-1)}>Día anterior</button>
        <button className="round-button" onClick={() => changeDay(1)}>Siguiente día</button>
        <p><AiOutlinePlusCircle style={{ color: 'green' }}/> Añadir</p>
      </div>
      <div>{hoursOfDay.map((hour) => renderHour(hour))}</div>

      {/* Enlace para volver a la página de recordatorios */}
      
    </div>
  );
};

export default CalendarDay;
