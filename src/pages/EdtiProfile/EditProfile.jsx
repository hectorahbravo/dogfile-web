import Register from "../Register/Register";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getUser, editUser } from "../../services/UserService";
import { object, string, mixed } from "yup";
import { useFormik } from "formik";
import Input from "../../components/Input/Input";
import Button from "../../components/Button";
import AuthContext from "../../contexts/AuthContext";
import "./EditProfile.css";
import { FaArrowLeft } from "react-icons/fa";

const userSchema = object({
  username: string().required("Campo requerido"),
  email: string()
    .email("Introduce un email válido")
    .required("Campo requerido"),
  avatar: mixed(),
});

const EditProfile = () => {
  const { user } = useContext(AuthContext);
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
      username: `${user.username}`,
      email: `${user.email}`,
      avatar: `${user.avatar}`, // Cambia el valor inicial a null
    },

    onSubmit: (values) => {
      console.log("Submitting form with values:", values);
      const data = new FormData();
      Object.keys(values).forEach((keyValue) => {
        data.append(keyValue, values[keyValue]);
        editUser(user.id, values)
          .then(() => {
            navigate("/user");
          })
          .catch((err) => console.error(err));
      });
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
          <div className="image-canva">
            <img src={user.avatar} alt="profile_image" />
          </div>
          <Input
            name="avatar"
            type="file"
            label="Add your photo"
            error={touched.avatar && errors.avatar}
            onChange={(event) => {
              setFieldValue("avatar", event.currentTarget.files[0]); // Establece el archivo seleccionado en el estado
            }}
            onBlur={handleBlur}
            extraClassName="input-image"
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
          </div>
          <div className="container-buttons">
            <Button
              type="submit"
              className="btn-register"
              text={"Guardar cambios"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
