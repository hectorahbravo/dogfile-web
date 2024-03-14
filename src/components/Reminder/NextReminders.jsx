function NextReminders({ reminders }) {
  // Filtrar los recordatorios para encontrar los próximos eventos que no han pasado
  const currentDate = new Date();
  const upcomingReminders = reminders
    ? reminders
        .filter((reminder) => {
          // Si el recordatorio no tiene fecha de finalización o es posterior a la fecha actual
          if (!reminder.endDate || new Date(reminder.endDate) >= currentDate) {
            // Si el recordatorio se repite
            if (reminder.repeat) {
              // Calcular la frecuencia de repetición
              switch (reminder.frequency) {
                case "daily":
                  return true; // Siempre se muestra si es diario
                case "weekly":
                  // Si la fecha actual está entre la start date y la end date y es un día de la semana
                  const startWeek = new Date(reminder.startDate).getDay();
                  const currentWeek = currentDate.getDay();
                  const daysDiff =
                    (currentDate - new Date(reminder.startDate)) /
                    (1000 * 60 * 60 * 24);
                  return startWeek === currentWeek && daysDiff % 7 === 0;
                case "monthly":
                  // Si la fecha actual es el mismo día del mes que la start date
                  return (
                    currentDate.getDate() ===
                    new Date(reminder.startDate).getDate()
                  );
                case "annually":
                  // Si la fecha actual es el mismo día y mes que la start date
                  const reminderStartDate = new Date(reminder.startDate);
                  return (
                    currentDate.getDate() === reminderStartDate.getDate() &&
                    currentDate.getMonth() === reminderStartDate.getMonth()
                  );
                default:
                  return false;
              }
            } else {
              // Si no se repite, mostrar si la fecha de inicio es posterior a la fecha actual
              return new Date(reminder.startDate) >= currentDate;
            }
          }
          return false; // No mostrar si la fecha de finalización ya ha pasado
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
            {/* Puedes agregar más información aquí según tus necesidades */}
          </div>
        ))
      ) : (
        <p>No hay próximos recordatorios.</p>
      )}
    </div>
  );
}

export default NextReminders;
