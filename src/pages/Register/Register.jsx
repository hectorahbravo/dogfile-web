import { object, string, mixed } from "yup";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import Input from "../../components/Input/Input";
import { register } from "../../services/AuthService";
import { getAllVets } from "../../services/VetService";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import Button from "../../components/Button/Button";

import "./Register.css";

const userSchema = object({
  username: string().required("Nombre de usuario es obligatorio"),
  email: string()
    .email("Introduce un email válido")
    .required("Email es obligatorio"),
  password: string()
    .min(8, "Debe tener 8 caracteres mínimo")
    .required("La contraseña es obligatoria"),
  avatar: mixed(),
  selectedVet: string(),
});

const Register = ({ initialValues, isEdit, onSubmit }) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [vets, setVets] = useState([]);

  useEffect(() => {
    getAllVets()
      .then(vets => setVets(vets))
      .catch(error => console.error('Error fetching vets:', error));
  }, []);

  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useFormik({
    initialValues: initialValues || {
      username: "",
      email: "",
      password: "",
      avatar: null,
      selectedVet: "",
    },
    onSubmit: (values) => {
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

  const handleLogin = () => {
    navigate("/");
  };

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
              setFieldValue("avatar", event.currentTarget.files[0]);
            }}
            onBlur={handleBlur}
          />
          <div className="input-container">
            <Input
              autoComplete="off"
              name="username"
              placeholder="Introduce tu nombre"
              value={values.username}
              error={touched.username && errors.username}
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
              style={{ display: isEdit ? "none" : "block" }}
            />
          </div>
          <div className="container-buttons">
            <Button
              type="submit"
              className="btn-register"
              text={isEdit ? "Guardar cambios" : "Registrar"}
            />
            <Button
              type={"button"}
              text="Inicia sesión"
              className="btn-login"
              onClick={handleLogin}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
