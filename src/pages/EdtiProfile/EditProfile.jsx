import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { editUser } from "../../services/UserService";
import { object, string } from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button.jsx";
import AuthContext from "../../contexts/AuthContext";
import { FaArrowLeft } from "react-icons/fa";
import "../Register/Register.css";
import "../../components/Button/Button.css";
import "../../components/Input/Input.css";
import { FaRegImage } from "react-icons/fa";

const userSchema = object({
  username: string().required("Campo requerido"),
  email: string()
    .email("Introduce un email válido")
    .required("Campo requerido"),
  avatar: string(),
});

const EditProfile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarURL, setAvatarURL] = useState(user.avatar);

  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useFormik({
    initialValues: {
      username: `${user.username}`,
      email: `${user.email}`,
      avatar: `${user.avatar}`,
    },

    onSubmit: (values) => {
      console.log("Submitting form with values:", values);
      console.log("Avatar URL before sending:", values.avatar);

      editUser(user.id, values)
        .then(() => {
          navigate("/user");
        })
        .catch((err) => console.error(err));
    },
    validationSchema: userSchema,
    validateOnBlur: true,
    validateOnMount: true,
  });

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
      <div className="edit-profile-container">
        <Link to={"/user"} className="exit-arrow">
          <FaArrowLeft />
        </Link>
        <form onSubmit={handleSubmit}>
          <div className="input-dog-avatar">
            <label htmlFor="avatar" className="icon-upload-image">
              <FaRegImage />
            </label>
            <img
              src={avatarURL}
              alt="profile_image"
              className="dog-input-image"
            />
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
          <div className="input-container">
            <Input
              autoComplete="off"
              name="username"
              label="Nombre de usuario"
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
              label="Correo electronico"
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
