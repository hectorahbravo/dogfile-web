function NextReminders({ reminders }) {
  const currentDate = new Date();
  const upcomingReminders = reminders
    ? reminders
        .filter((reminder) => {
          if (!reminder.endDate || new Date(reminder.endDate) >= currentDate) {
            // Si el recordatorio se repite
            if (reminder.repeat) {
              switch (reminder.frequency) {
                case "daily":
                  return true;
                case "weekly":
                  const startWeek = new Date(reminder.startDate).getDay();
                  const currentWeek = currentDate.getDay();
                  const daysDiff =
                    (currentDate - new Date(reminder.startDate)) /
                    (1000 * 60 * 60 * 24);
                  return startWeek === currentWeek && daysDiff % 7 === 0;
                case "monthly":
                  return (
                    currentDate.getDate() ===
                    new Date(reminder.startDate).getDate()
                  );
                case "annually":
                  const reminderStartDate = new Date(reminder.startDate);
                  return (
                    currentDate.getDate() === reminderStartDate.getDate() &&
                    currentDate.getMonth() === reminderStartDate.getMonth()
                  );
                default:
                  return false;
              }
            } else {
              return new Date(reminder.startDate) >= currentDate;
            }
          }
          return false;
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
