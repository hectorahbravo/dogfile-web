import { useFormik } from "formik";
import { object, string, boolean, date, mixed } from "yup";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import { reminderCreate } from "../../services/ReminderService";
import "./ReminderForm.css";
import {
  optionsFrecuencia,
  optionsIcono,
  optionsTipo,
} from "../../dist/constant/reminderSelectForm";
import Select from "../Select/Select";
import { Link } from "react-router-dom";

const reminderSchema = object({
  title: string().required("El título es obligatorio"),
  type: string().required("El tipo es obligatorio"),
  icon: string().required("El icono es obligatorio"),
  photo: mixed(),
  repeat: boolean(),
  frequency: string(),
  startDate: date(),
  endDate: date(),
  hour: string(),
});

const ReminderForm = () => {
  const { user } = useContext(AuthContext);
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      title: "",
      type: "",
      icon: "",
      photo: null,
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
    },
    validationSchema: reminderSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
  });
  console.log(errors);

  const [selectedIcon, setSelectedIcon] = useState("");

  const handleIconChange = (icon) => {
    setSelectedIcon(icon.value);

    handleChange({
      target: {
        name: "icon",
        value: icon.value,
      },
    });
  };

  useEffect(() => {
    if (values.startDate === "" && values.endDate === "") {
      const today = new Date();
      const formattedToday = today.toISOString().split("T")[0];
      handleChange({
        target: {
          name: "startDate",
          value: formattedToday,
        },
      });
      handleChange({
        target: {
          name: "endDate",
          value: formattedToday,
        },
      });
    }
  }, [handleChange, values.startDate, values.endDate]);
  return (
    <>
      <Link to="/reminders">
        <Button text="Atrás" />
      </Link>
      <form onSubmit={handleSubmit}>
        <Input
          className={"reminder-input-container"}
          placeholder="Titulo"
          label="Título"
          name="title"
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.title}
          error={touched.title && errors.title}
        />
        {/*name="avatar"
            type="file"
            label="Add your photo"
            error={touched.avatar && errors.avatar}
            onChange={(event) => {
              setFieldValue("avatar", event.currentTarget.files[0]); // Establece el archivo seleccionado en el estado
            }}
            onBlur={handleBlur}
            className="image-canva" */}
        <Input
          className={"reminder-input-container"}
          name="photo"
          type="file"
          label="Agrega una foto"
          placeholder="Foto"
          onChange={(event) => {
            setFieldValue("photo", event.currentTarget.files[0]); // Establece el archivo seleccionado en el estado
          }}
          onBlur={handleBlur}
          error={touched.photo && errors.photo}
        />
        <Select
          options={optionsTipo}
          value={values.type}
          onChange={handleChange}
          name="type"
          label="tipo"
          classNamelassName="reminder-select-container"
        />

        <div className="reminder-checkbox-container">
          {optionsIcono.map((iconOption, index) => (
            <label key={index}>
              <input
                type="checkbox"
                checked={selectedIcon === iconOption.value}
                onChange={() => handleIconChange(iconOption)}
              />
              <img src={iconOption.value} alt={`Icono ${index}`} />
            </label>
          ))}
        </div>
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
          className={"reminder-input-container"}
          options={optionsFrecuencia}
          value={values.frequency}
          onChange={handleChange}
          name="frequency"
          label="Frecuencia"
        />
        <Input
          className={"reminder-input-container"}
          placeholder="Fecha de inicio"
          label="Fecha de inicio"
          name="startDate"
          type="date"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.startDate}
          error={touched.startDate && errors.startDate}
        />
        <Input
          className={"reminder-input-container"}
          placeholder="Fecha de Fin"
          label="Fecha de inicio"
          name="endDate"
          type="date"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.endDate}
          error={touched.endDate && errors.endDate}
        />
        <Input
          className={"reminder-input-container"}
          placeholder="Hora"
          label="Hora"
          name="hour"
          type="time"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.hour}
          error={touched.hour && errors.hour}
        />

        <Button type="submit" text={"Crear"} />
      </form>
    </>
  );
};

export default ReminderForm;
