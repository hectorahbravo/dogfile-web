import { useState } from "react";
import ReactCalendar from "react-calendar";
import "./Calendar.css";
import "react-calendar/dist/Calendar.css";

function Calendar() {
  const [value, onChange] = useState(new Date());

  return (
    <div className="react-calendar">
      <ReactCalendar selectRange onChange={onChange} value={value} />
      {console.log(value.toString().split(","))}
    </div>
  );
}

export default Calendar;
