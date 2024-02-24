import Input from "../components/Input";
import { useFormik } from "formik";
import { string, object } from "yup";
import Button from "../components/Button";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const userSchema = object({
  email: string().email("Enter a valid email").required("Required field"),
  password: string()
    .min(8, "Password of at least 8 characters")
    .required("Required field"),
});

const Login = () => {
  const { login } = useContext(AuthContext);
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
      login(values).then(() => navigate("/"));
    },
    validationSchema: userSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
  });

  return (
    <div>
      <h1 className="text-tw-primary uppercase font-bold text-3xl underline">
        Sign in your account
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <Input
            autocomplete="off"
            name="email"
            type="email"
            label="Email"
            placeholder="pablo@pablo.com"
            value={values.email}
            error={touched.email && errors.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            name="password"
            type="password"
            label="Password"
            placeholder="12345678"
            value={values.password}
            error={touched.password && errors.password}
            onChange={handleChange}
            onBlur={handleBlur}
            autocomplete="off"
          />
        </div>
        <Button
          type={"button"}
          extraClassName="mt-4"
          disabled={!isValid}
          text="Sign in"
        />
      </form>
    </div>
  );
};

export default Login;
