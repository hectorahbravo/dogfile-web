import { object, string, mixed } from "yup";
import { useFormik } from "formik";
import Input from "../../components/Input/Input";
import { register } from "../../services/AuthService";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button/Button";

import "./Register.css";
const userSchema = object({
  username: string().required("Campo requerido"),
  email: string()
    .email("Introduce un email válido")
    .required("Campo requerido"),
  password: string()
    .min(8, "Debe tener 8 caracteres mínimo")
    .required("Campo requerido"),
  avatar: mixed(),
});
const Register = ({ initialValues, isEdit, onSubmit }) => {
  const { userId } = useParams();
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
      username: "",
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
        onSubmit(userId, data)
          .then(() => {
            navigate("/user");
          })
          .catch((err) => console.error(err));
      } else {
        register(data)
          .then(() => {
            navigate("/");
          })
          .catch((err) => console.error(err));
      }
    },
    validationSchema: userSchema,
    validateOnBlur: true,
    validateOnMount: true,
  });
  console.log(errors);
  console.log(values);
  return (
    <div className="background">
      <Link to={"/"}>atras</Link>
      <div className="register-container">
        <form onSubmit={handleSubmit}>
          <Input
            name="avatar"
            type="file"
            label="Add your photo"
            error={touched.avatar && errors.avatar}
            onChange={(event) => {
              setFieldValue("avatar", event.currentTarget.files[0]); // Establece el archivo seleccionado en el estado
            }}
            onBlur={handleBlur}
            className="image-canva"
          />
          <div className="input-container">
            <Input
              autocomplete="off"
              name="username"
              label="User name"
              placeholder="Introduce tu nombre"
              value={values.username}
              error={touched.username && errors.username}
              onChange={handleChange}
              onBlur={handleBlur}
              className="login-form"
            />
            <Input
              autocomplete="off"
              name="email"
              type="email"
              label="Email"
              placeholder="Introduce tu e-mail"
              value={values.email}
              error={touched.email && errors.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="login-form"
            />
            <Input
              autocomplete="off"
              name="password"
              type="password"
              label="Password"
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
export default Register;
