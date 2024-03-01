import { object, string, mixed } from "yup";
import { useFormik } from "formik";
import Input from "../../components/Input/Input";
import { register } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
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
  avatar: mixed().required("Campo requerido"),
});

const Register = () => {
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
    initialValues: {
      username: "",
      email: "",
      password: "",
      avatar: "",
    },
    onSubmit: (values) => {
      console.log("hola");
      const data = new FormData();
      Object.keys(values).forEach((keyValue) => {
        data.append(keyValue, values[keyValue]);
      });

      register(data)
        .then(() => {
          navigate("/");
        })
        .catch((err) => console.error(err));
    },
    validationSchema: userSchema,
    validateOnBlur: true,
    validateOnMount: true,
  });
  return (
    <div className="background">
      <div className="register-container">
        <form onSubmit={handleSubmit}>
          <Input
            name="avatar"
            type="file"
            label="Add your photo"
            //value={values.avatar}
            error={touched.avatar && errors.avatar}
            onChange={(event) => {
              setFieldValue("avatar", event.currentTarget.files[0]);
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
            />
          </div>
          <div className="container-buttons">
            <Button type="submit" className="btn-register" text="Registrar" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
