import Input from "../../components/Input/Input";
import { useFormik } from "formik";
import { string, object } from "yup";
import Button from "../../components/Button/Button";
import { useContext, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo6.png";
import "./Login.css";

const userSchema = object({
  email: string().email("Email no válido").required("El email es requerido"),
  password: string()
    .min(8, "Debe tener 8 caracteres como mínimo")
    .required("La contraseña es requerida"),
});

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false); // Nuevo estado

  const {
    values,
    errors,
    touched,
    isValid,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      setFormSubmitted(true); // Marcamos que el formulario ha sido enviado
      login(values).then(() => navigate("/user"));
    },
    validationSchema: userSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
  });

  const handleSignIn = () => {
    navigate("/register");
  };

  return (
    <div className="background">
      <div className="login-container">
        <img className="logo" src={Logo} />

        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <Input
              autoComplete="off" // Corregido a autoComplete
              name="email"
              type="email"
              placeholder="Tuemail@dogfile.com"
              value={values.email}
              error={touched.email && errors.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="login-form"
              classNamePlaceholder="placeholder"
            />
            <Input
              name="password"
              type="password"
              placeholder="Contraseña"
              value={values.password}
              error={touched.password && errors.password}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off" // Corregido a autoComplete
              className="login-form"
              classNamePlaceholder="placeholder"
            />
          </div>
          <div className="container-buttons-login">
            <Button
              type={"button"}
              extraClassName="mt-4"
              disabled={!isValid || formSubmitted} // Deshabilitar si el formulario ha sido enviado
              text="Sign in"
              className="btn-sign"
              onClick={handleSignIn}
            />
            <Button
              type="submit"
              disabled={!isValid || formSubmitted} // Deshabilitar si el formulario ha sido enviado
              text="Log in"
              className="btn-login"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
