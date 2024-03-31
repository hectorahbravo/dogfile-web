import { object, string, mixed } from "yup";
import { useFormik } from "formik";
import Input from "../../components/Input/Input";
import { registerVet } from "../../services/AuthService";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import Button from "../../components/Button/Button";

import "./RegisterVet.css";

const userSchema = object({
  name: string().required("Campo requerido"),
  email: string()
    .email("Introduce un email válido")
    .required("Campo requerido"),
  password: string()
    .min(8, "Debe tener 8 caracteres mínimo")
    .required("Campo requerido"),
  avatar: mixed(),
});

const RegisterVet = ({ initialValues, isEdit, onSubmit }) => {
  const { vetId } = useParams();
  const navigate = useNavigate();
  const {
    values,
    errors,
    touched,
    isValid,
    setFieldValue,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useFormik({
    initialValues: initialValues || {
      name: "",
      email: "",
      password: "",
      avatar: null, // Cambia el valor inicial a null
    },
    onSubmit: (values) => {
      console.log("Submitting form with values:", values);
      const data = new FormData();
      Object.keys(values).forEach((keyValue) => {
        data.append(keyValue, values[keyValue]);
      });
      if (isEdit) {
        onSubmit(vetId, data)
          .then(() => {
            navigate("/vets");
          })
          .catch((err) => console.error(err));
      } else {
        registerVet(data)
          .then(() => {
            navigate("/login/vets");
          })
          .catch((err) => console.error(err));
      }
    },
    validationSchema: userSchema,
    validateOnBlur: true,
    validateOnMount: true,
  });

  return (
    <div className="background">
      <div className="register-container">
        <Link to={"/"}>
          <FaArrowLeft className="exit-arrow" />
        </Link>
        <form onSubmit={handleSubmit}>
          <img src="" className="image-canva" alt="" />
          <Input
            name="avatar"
            type="file"
            error={touched.avatar && errors.avatar}
            onChange={(event) => {
              setFieldValue("avatar", event.currentTarget.files[0]); // Establece el archivo seleccionado en el estado
            }}
            onBlur={handleBlur}
          />
          <div className="input-container">
            <Input
              autoComplete="off"
              name="name"
              placeholder="Introduce tu nombre"
              value={values.name}
              error={touched.name && errors.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="login-form"
            />
            <Input
              autoComplete="off"
              name="email"
              type="email"
              placeholder="Introduce tu e-mail"
              value={values.email}
              error={touched.email && errors.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="login-form"
            />
            <Input
              autoComplete="off"
              name="password"
              type="password"
              placeholder="Añade una contraseña"
              value={values.password}
              error={touched.password && errors.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="login-form"
              style={{ display: isEdit ? "none" : "block" }} // Ocultar el campo si isEdit es true
            />
          </div>
          <div className="container-buttons">
            <Button
              type="submit"
              className="btn-register"
              text={isEdit ? "Guardar cambios" : "Registrar"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterVet;
