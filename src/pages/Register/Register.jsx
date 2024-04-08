import { useState } from "react";
import { object, string } from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa";
import Button from "../../components/Button/Button";
import { register } from "../../services/AuthService";
import "./Register.css";
import Input from "../../components/Input/Input";
import { Oval } from "react-loader-spinner";

const userSchema = object({
  username: string().required("Nombre de usuario es obligatorio"),
  email: string()
    .email("Introduce un email válido")
    .required("Email es obligatorio"),
  password: string()
    .min(8, "Debe tener 8 caracteres mínimo")
    .required("La contraseña es obligatoria"),
  avatar: string().required("Selecciona una Foto"),
  selectedVet: string(),
});

const Register = ({ initialValues, isEdit }) => {
  const navigate = useNavigate();
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarURL, setAvatarURL] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      avatar: "",
    },
    onSubmit: (values, { setSubmitting }) => {
      setIsSubmitting(true);
      register(values)
        .then(() => {
          navigate("/");
        })
        .catch((err) => console.error(err))
        .finally(() => {
          setIsSubmitting(false);
          setSubmitting(false);
        });
    },
    validationSchema: userSchema,
    validateOnBlur: true,
    validateOnMount: true,
  });

  const handleLogin = () => {
    navigate("/");
  };

  const handleAvatarChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setAvatarURL(reader.result);
        setFieldValue("avatar", reader.result);
      };
    }
  };

  return (
    <div className="background">
      <div className="register-container">
        <Link to={"/"} className="exit-arrow">
          <FaArrowLeft />
        </Link>
        <form onSubmit={handleSubmit}>
          <div className="input-dog-avatar">
            <label
              htmlFor="avatar"
              className={`icon-upload-image ${
                avatarURL ? "icon-upload-image-edit" : ""
              }`}
            >
              <FaRegImage />
            </label>
            <img src={avatarURL} className="dog-input-image" alt="avatar" />
            <div className="file-input-wrapper">
              <input
                id="avatar"
                name="avatar"
                type="file"
                onChange={handleAvatarChange}
                onBlur={handleBlur}
                className="input-file"
              />
            </div>
          </div>
          <div className="input-container input-container-register ">
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
              className="btn-register btn-register-view"
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
                ) : isEdit ? (
                  "Guardar cambios"
                ) : (
                  "Registrar"
                )
              }
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
