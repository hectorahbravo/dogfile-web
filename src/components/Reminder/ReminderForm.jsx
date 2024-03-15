import { useFormik } from "formik";
import { object, string, boolean, date } from "yup";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Select from "../Select/Select";
import "../Button/Button.css";
import {
  optionsFrecuencia,
  optionsIcono,
  optionsTipo,
} from "../../dist/constant/reminderSelectForm";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { reminderCreate } from "../../services/ReminderService";
import "./ReminderForm.css";
import { useNavigate } from "react-router-dom";

const reminderSchema = object({
  title: string().required("El título es obligatorio"),
  type: string().required("El tipo es obligatorio"),
  icon: string().required("El icono es obligatorio"),
  photo: string(),
  repeat: boolean(),
  frequency: string(),
  startDate: date(),
  endDate: date(),
  hour: string(),
});
const ReminderForm = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        title: "",
        type: "",
        icon: "",
        photo: "",
        repeat: false,
        frequency: "",
        startDate: "",
        endDate: "",
        hour: "",
      },
      onSubmit: (values) => {
        const startDateString = values.startDate.toString();
        const endDateString = values.endDate.toString();
        reminderCreate({
          ...values,
          startDate: startDateString,
          endDate: endDateString,
          user: user.id,
        });
        console.log(values);

        navigate("/");
      },
      validationSchema: reminderSchema,
      validateOnChange: true,
      validateOnBlur: true,
      validateOnMount: true,
    });
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

          <label>
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
            value={values.startDate || formatDate(new Date())}
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
            value={values.endDate || formatDate(new Date())}
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
            value={values.hour || "12:00"}
            error={touched.hour && errors.hour}
            className="reminder-input-container"
          />

          <Button
            type="submit"
            className="btn-register btn-reminder-new"
            text={"Crear un reacordatorio"}
          />
        </form>
      </div>
    </div>
  );
};
export default ReminderForm;
