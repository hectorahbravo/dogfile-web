import { useState } from "react";

const CalendarDay = () => {
  const [events, setEvents] = useState({});

  const handleEventInput = (hour) => {
    const eventDescription = prompt(`Enter event description for ${hour}:`);
    if (eventDescription !== null) {
      setEvents((prevEvents) => ({
        ...prevEvents,
        [hour]: eventDescription,
      }));
    }
  };

  return (
    <div>
      <h2>Day View</h2>
      <div>
        {Array.from({ length: 24 }, (_, index) => {
          const hour = `${index < 10 ? "0" : ""}${index}:00`;
          return (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                height: "60px",
                padding: "5px",
                marginBottom: "5px",
              }}
              onClick={() => handleEventInput(hour)}
            >
              <p>{hour}</p>
              {events[hour] && <p>{events[hour]}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarDay;
