import Input from "../../components/Input/Input";
import { useFormik } from "formik";
import { string, object } from "yup";
import Button from "../../components/Button/Button";
import { useContext } from "react";
import VetContext from "../../contexts/VetContext";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo6.png";
import "./LoginVet.css";

const userSchema = object({
  email: string().email("Email no válido").required("Requerido"),
  password: string()
    .min(8, "Debe tener 8 caracteres como mínimo")
    .required("Requerido"),
});

const LoginVet = () => {
  const { loginVet } = useContext(VetContext);
  const navigate = useNavigate();

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
      loginVet(values).then(() => navigate("/vets"));
    },
    validationSchema: userSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
  });

  const handleSignIn = () => {
    navigate("/register/vets");
  };

  return (
    <div className="background">
      <div className="login-container">
        <img className="logo" src={Logo} />

        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <Input
              autocomplete="off"
              name="email"
              type="email"
              label="Email"
              placeholder="email"
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
              label="Password"
              placeholder="contraseña"
              value={values.password}
              error={touched.password && errors.password}
              onChange={handleChange}
              onBlur={handleBlur}
              autocomplete="off"
              className="login-form"
              classNamePlaceholder="placeholder"
            />
          </div>
          <div className="container-buttons">
            <Button
              type="submit"
              disabled={!isValid}
              text="Log in"
              className="btn-login"
            />
            <Button
              type={"button"}
              extraClassName="mt-4"
              disabled={!isValid}
              text="Sign in"
              className="btn-sign"
              onClick={handleSignIn}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginVet;
