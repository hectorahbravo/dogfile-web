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
import { reminderCreate } from "../../services/ReminderService";

const reminderSchema = object({
  title: string().required("El título es obligatorio"),
  type: string()
    .required("El tipo es obligatorio")
    .oneOf(["tipo1", "tipo2", "tipo3", "other"], "Tipo inválido"),
  icon: string()
    .required("El icono es obligatorio")
    .oneOf(["icon1", "icon2", "icon3", "icon4"], "Icono inválido"),
  photo: string(),
  repeat: boolean(),
  frequency: string().oneOf(
    ["daily", "monthly", "annually"],
    "Frecuencia inválida"
  ),
  startingDate: date(),
  hour: string(),
});

const ReminderForm = () => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        title: "",
        type: "",
        icon: "",
        photo: "",
        repeat: false,
        frequency: "",
        startingDate: "",
        hour: "",
      },
      onSubmit: (values) => {
        reminderCreate(values);
        console.log(values);
      },
      validationSchema: reminderSchema,
      validateOnChange: true,
      validateOnBlur: true,
      validateOnMount: true,
    });

  return (
    <form onSubmit={handleSubmit}>
      <Input
        placeholder="Titulo"
        label="Título"
        name="title"
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.title}
        error={touched.title && errors.title}
      />
      <Select
        options={optionsTipo}
        value={values.type}
        onChange={handleChange}
        name="type"
        label="tipo"
      />
      <Select
        options={optionsIcono}
        value={values.icon}
        onChange={handleChange}
        name="icon"
        label="Icono"
      />
      <Input
        placeholder="Foto"
        label="Foto"
        name="photo"
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.photo}
        error={touched.photo && errors.photo}
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
      />
      <Input
        placeholder="Fecha de inicio"
        label="Fecha de inicio"
        name="startingDate"
        type="date"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.startingDate}
        error={touched.startingDate && errors.startingDate}
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
      />

      <Button type="submit" text={"Crear"} />
    </form>
  );
};

export default ReminderForm;
