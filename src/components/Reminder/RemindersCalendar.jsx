import React, { useState } from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function RemindersCalendar() {
  const [reminders, setReminders] = useState([
    {
      id: "65e8cd90add02662b6b0f301",
      title: "Medicina",
      type: ["Array (1)"],
      icon: "icon1",
      photo:
        "https://www.kiwoko.com/dw/image/v2/BDLQ_PRD/on/demandware.static/-/Sit…",
      repeat: false,
      frequency: "",
      date: new Date("2024-03-07T20:30:00"),
    },
    {
      id: "65e8cda7add02662b6b0f303",
      title: "Medicin2",
      type: ["Array (1)"],
      icon: "icon1",
      photo:
        "https://www.kiwoko.com/dw/image/v2/BDLQ_PRD/on/demandware.static/-/Sit…",
      repeat: true,
      frequency: "daily",
      date: new Date("2024-03-07T20:30:00"),
    },
    {
      id: "65e8cdbbadd02662b6b0f305",
      title: "Medicin3",
      type: ["Array (1)"],
      icon: "icon2",
      photo:
        "https://www.kiwoko.com/dw/image/v2/BDLQ_PRD/on/demandware.static/-/Sit…",
      repeat: true,
      frequency: "annually",
      date: new Date("2024-03-20T20:30:00"),
    },
  ]);

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const eventsOnDay = reminders.filter(
        (reminder) =>
          reminder.date.getFullYear() === date.getFullYear() &&
          reminder.date.getMonth() === date.getMonth() &&
          reminder.date.getDate() === date.getDate()
      );
      return eventsOnDay.length > 0 ? (
        <div>{eventsOnDay.length} events</div>
      ) : null;
    }
  };

  return (
    <div className="react-calendar">
      <ReactCalendar tileContent={tileContent} />
    </div>
  );
}

export default RemindersCalendar;
