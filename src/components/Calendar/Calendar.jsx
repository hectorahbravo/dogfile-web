import { useState } from 'react';
import ReactCalendar from 'react-calendar';
import './Calendar.css'
import 'react-calendar/dist/Calendar.css';

function Calendar() {
  const [value, onChange] = useState(new Date());

  return (
    <div className='react-calendar'>
      <ReactCalendar onChange={onChange} value={value} />
    </div>
  );
}

export default Calendar;