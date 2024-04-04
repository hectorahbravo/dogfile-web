import { useContext, useState, useEffect } from "react";
import { useFormik } from "formik";
import { object, string, boolean, date } from "yup";
import Select from "../Select/Select";
import Button from "../Button/Button";
import VetAuthContext from "../../contexts/VetContext";
import { vetReminderCreate } from "../../services/VetReminderService";
import { getDogsAssociatedWithVet } from "../../services/VetService";
import "./VetReminderForm.css";
import { useNavigate } from "react-router-dom";
import { optionsFrecuencia } from "../../dist/constant/reminderSelectForm";

const vetReminderSchema = object({
  title: string().required("El título es obligatorio"),
  type: string().required("El tipo es obligatorio"),
  icon: string().required("El icono es obligatorio"),
  photo: string(),
  repeat: boolean(),
  frequency: string(),
  startDate: date(),
  endDate: date(),
  hour: string(),
  destinatary: string().required("El destinatario es obligatorio"),
});

const VetReminderForm = () => {
  const { vet } = useContext(VetAuthContext);
  const navigate = useNavigate();
  const [dogs, setDogs] = useState([]);
  const [selectedDog, setSelectedDog] = useState("");

  useEffect(() => {
    if (vet) {
      console.log("Valor de vet:", vet);

      // Obtener los perros asociados a la veterinaria
      getDogsAssociatedWithVet(vet.id)
        .then((dogsData) => {
          console.log("Datos de los perros:", dogsData);
          setDogs(dogsData);
        })
        .catch((error) => {
          console.error(
            "Error al obtener los perros asociados con la veterinaria:",
            error
          );
        });
    }
  }, [vet]);
  // Efecto secundario para realizar operaciones dependientes de dogs
  useEffect(() => {
    // Realizar operaciones dependientes de dogs aquí
    console.log("Dogs actualizados:", dogs);
    if (dogs && dogs.length > 0) {
      // Verificar si dogs no es undefined antes de acceder a su propiedad length
      // Realizar operaciones que dependen de dogs aquí
    }
  }, [dogs]);
  // Esta dependencia asegura que el efecto se ejecute después de que dogs se actualice

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDogChange = (e) => {
    setSelectedDog(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = (values) => {
    const startDateString = values.startDate.toString();
    const endDateString = values.endDate.toString();
    vetReminderCreate({
      ...values,
      startDate: startDateString,
      endDate: endDateString,
      vet: vet ? vet.id : null,
      dogId: selectedDog, // Cambia userId por dogId
    })
      .then(() => {
        navigate("/vetreminders");
      })
      .catch((error) => {
        console.error("Error creating vet reminder:", error);
      });
  };

  const { values, errors, touched, handleBlur, handleChange } = useFormik({
    initialValues: {
      title: "",
      type: "",
      icon: "",
      photo: "",
      repeat: false,
      frequency: "",
      startDate: formatDate(new Date()),
      endDate: formatDate(new Date()),
      hour: "12:00",
      destinatary: "",
    },
    onSubmit: handleSubmit,
    validationSchema: vetReminderSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
  });

  return (
    <div className="background">
      <div className="newreminder-container">
        <form className="newreminder-form" onSubmit={handleSubmit}>
          <input
            placeholder="Título"
            name="title"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.title}
            className="reminder-input-container"
          />
          <Select
            options={[
              { value: "Medicamentos", label: "Medicamentos" },
              { value: "Vacuna", label: "Vacuna" },
              {
                value: "Visita al veterinario",
                label: "Visita al veterinario",
              },
              // Agrega aquí más opciones si es necesario
            ]}
            value={values.type}
            onChange={handleChange}
            name="type"
            label="Tipo"
            className="reminder-input-container"
          />
          <input
            placeholder="Icono"
            name="icon"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.icon}
            className="reminder-input-container"
          />
          <input
            placeholder="Foto"
            name="photo"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.photo}
            className="reminder-input-container"
          />
          <label className="reminder-form-repeat">
            <input
              type="checkbox"
              name="repeat"
              onChange={handleChange}
              onBlur={handleBlur}
              checked={values.repeat}
            />
            Repetir
          </label>
          <Select
            options={optionsFrecuencia}
            value={values.frequency}
            onChange={handleChange}
            name="frequency"
            label="Frecuencia"
            className="reminder-input-container"
            extraClassName="reminder-select-form"
          />
          <input
            placeholder="Fecha de inicio"
            name="startDate"
            type="date"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.startDate}
            className="reminder-input-container"
          />
          <input
            placeholder="Fecha de fin"
            name="endDate"
            type="date"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.endDate}
            className="reminder-input-container"
          />
          <input
            placeholder="Hora"
            name="hour"
            type="time"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.hour}
            className="reminder-input-container"
          />
          <Select
            options={
              dogs
                ? dogs.map((dog) => ({ value: dog.id, label: dog.name }))
                : []
            }
            value={selectedDog}
            onChange={handleDogChange}
            name="destinatary"
            label="Destinatario"
            className="reminder-input-container"
          />

          <Button
            type="submit"
            className="btn-register btn-reminder-new"
            text={"Crear un recordatorio"}
          />
        </form>
      </div>
    </div>
  );
};

export default VetReminderForm;
