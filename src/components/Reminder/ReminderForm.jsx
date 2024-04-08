import { useContext, useState } from "react";
import { useFormik } from "formik";
import { object, string, boolean, date } from "yup";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Select from "../Select/Select";
import {
  optionsFrecuencia,
  optionsIcono,
  optionsTipo,
} from "../../dist/constant/reminderSelectForm";
import AuthContext from "../../contexts/AuthContext";
import { reminderCreate } from "../../services/ReminderService";
import "./ReminderForm.css";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Oval } from "react-loader-spinner";

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
  const [isSubmitting, setIsSubmitting] = useState(false); // Nuevo estado

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
        startDate: formatDate(new Date()),
        endDate: formatDate(new Date()),
        hour: "12:00",
      },
      onSubmit: (values) => {
        setIsSubmitting(true);
        const startDateString = values.startDate.toString();
        const endDateString = values.endDate.toString();
        reminderCreate({
          ...values,
          startDate: startDateString,
          endDate: endDateString,
          user: user.id,
        })
          .then(() => {
            setIsSubmitting(false);
            navigate("/reminders");
          })
          .catch((err) => {
            setIsSubmitting(false);
            console.error(err);
          });
      },
      validationSchema: reminderSchema,
      validateOnChange: true,
      validateOnBlur: true,
      validateOnMount: true,
    });

  return (
    <div className="background">
      <div className="newreminder-container">
        <Link to={"/reminders"} className="exit-arrow">
          <FaArrowLeft />
        </Link>
        <h2>Nuevo recordatorio</h2>
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
            className="reminder-input-container "
          />
          <Select
            options={optionsTipo}
            value={values.type}
            onChange={handleChange}
            name="type"
            label="Tipo"
            className="reminder-input-container"
            extraClassName="reminder-select-form "
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

          <Button
            type="submit"
            disabled={isSubmitting}
            className="btn-register btn-reminder-new"
            text={
              isSubmitting ? (
                <Oval
                  className="spiner"
                  visible={true}
                  height="25"
                  width="25"
                  color="black"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                "Crear un recordatorio"
              )
            }
          />
        </form>
      </div>
    </div>
  );
};
export default ReminderForm;
