import React from "react";

function NextReminders({ reminders }) {
  const currentDate = new Date();
  const upcomingReminders = reminders
    ? reminders
        .filter((reminder) => {
          return (
            (!reminder.endDate || new Date(reminder.endDate) >= currentDate) &&
            new Date(reminder.startDate) >= currentDate
          );
        })
        .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
    : [];

  return (
    <div className="next-reminders-container">
      <h2>Próximos Recordatorios</h2>
      {upcomingReminders.length > 0 ? (
        upcomingReminders.map((reminder, index) => (
          <div className="reminder-card" key={index}>
            <h3>{reminder.title}</h3>
            <p>Fecha: {new Date(reminder.startDate).toLocaleDateString()}</p>
          </div>
        ))
      ) : (
        <p>No hay próximos recordatorios.</p>
      )}
    </div>
  );
}

export default NextReminders;
