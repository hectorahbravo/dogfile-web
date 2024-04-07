import { useContext, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import Input from "../Input/Input";
import {
  optionsFrecuencia,
  optionsIcono,
  optionsTipo,
} from "../../dist/constant/reminderSelectForm";
import { object, string, boolean, date } from 'yup';
import Select from '../Select/Select';
import Button from '../Button/Button';
import VetAuthContext from '../../contexts/VetContext';
import { vetReminderCreate } from '../../services/VetReminderService';
import { getDogsAssociatedWithVet } from '../../services/VetService';
import './VetReminderForm.css';
import { useNavigate } from 'react-router-dom';

const vetReminderSchema = object({
  title: string().required('El título es obligatorio'),
  type: string().required('El tipo es obligatorio'),
  icon: string().required('El icono es obligatorio'),
  photo: string(),
  repeat: boolean(),
  frequency: string(),
  startDate: date(),
  endDate: date(),
  hour: string(),
  destinatary: string().required('El destinatario es obligatorio'),
});

const VetReminderForm = () => {
  const { vet } = useContext(VetAuthContext);
  const navigate = useNavigate();
  

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      title: '',
      type: '',
      icon: '',
      photo: '',
      repeat: false,
      frequency: '',
      startDate: formatDate(new Date()),
      endDate: formatDate(new Date()),
      hour: '12:00',
      destinatary: '',
    },
    onSubmit: async (values) => {
      const startDateString = values.startDate.toString();
      const endDateString = values.endDate.toString();
      
      try {
        await vetReminderCreate({
          ...values,
          startDate: startDateString,
          endDate: endDateString,
          vet: vet.id,
        });
        
        console.log("Recordatorio creado exitosamente");
        navigate("/login-vets");
      } catch (error) {
        console.error("Error al crear el recordatorio:", error);
      }
    },
    validationSchema: vetReminderSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
  });

  const [dogs, setDogs] = useState([]);
  const [selectedDog, setSelectedDog] = useState('');

  useEffect(() => {
    if (vet) {
      console.log('Valor de vet:', vet);
  
      // Obtener los perros asociados a la veterinaria
      getDogsAssociatedWithVet(vet.id)
        .then((dogsData) => { 
          console.log('Datos de los perros:', dogsData);        
          setDogs(dogsData);
        })
        .catch((error) => {
          console.error('Error al obtener los perros asociados con la veterinaria:', error);
        });
    }
  }, [vet]);
  // Efecto secundario para realizar operaciones dependientes de dogs
  useEffect(() => {
    // Realizar operaciones dependientes de dogs aquí
    console.log("Dogs actualizados:", dogs);
    if (dogs && dogs.length > 0) { // Verificar si dogs no es undefined antes de acceder a su propiedad length
      // Realizar operaciones que dependen de dogs aquí
    }
}, [dogs]);
 // Esta dependencia asegura que el efecto se ejecute después de que dogs se actualice


 const handleDogChange = (e) => {
    setSelectedDog(e.target.value);
    console.log("Perro seleccionado:", e.target.value);
  };


  return (
    <div className="background">
      <div className="newreminder-container">
        <form className="newreminder-form" onSubmit={handleSubmit}>
        <Input
            placeholder="Titulo"
            label="Título"
            name="title"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.title}
            error={touched.title && errors.title}
            className="reminder-input-container"
          />
        <Select
            options={optionsTipo}
            value={values.type}
            onChange={handleChange}
            name="type"
            label="Tipo"
            className="reminder-input-container"
            extraClassName="reminder-select-form"
          />
          <Select
            options={optionsIcono}
            value={values.icon}
            onChange={handleChange}
            name="icon"
            label="Icono"
            extraClassName="reminder-select-form"
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
          <Input
            placeholder="Fecha de inicio"
            label="Fecha de inicio"
            name="startDate"
            type="date"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.startDate}
            error={touched.startDate && errors.startDate}
            className="reminder-input-container"
          />
          <Input
            placeholder="Fecha de Fin"
            label="Fecha de inicio"
            name="endDate"
            type="date"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.endDate}
            error={touched.endDate && errors.endDate}
            className="reminder-input-container"
          />
          <Input
            placeholder="Hora"
            label="Hora"
            name="hour"
            type="time"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.hour}
            error={touched.hour && errors.hour}
            className="reminder-input-container"
          />

          <Select
            options={dogs ? dogs.map((dog) => ({ value: dog.id, label: dog.name })) : []}
            value={selectedDog}
            onChange={handleDogChange}
            name="destinatary"
            label="Destinatario"
            className="reminder-input-container"
          />

          <Button type="submit" className="btn-register btn-reminder-new" text={'Crear un recordatorio'} />
        </form>
      </div>
    </div>
  );
};

export default VetReminderForm;
