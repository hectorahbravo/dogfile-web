import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { editUser } from "../../services/UserService";
import { object, string, mixed } from "yup";
import { useFormik } from "formik";
import { object, string, mixed } from "yup";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button.jsx";
import AuthContext from "../../contexts/AuthContext";
import { editUser } from "../../services/UserService";
import { FaArrowLeft } from "react-icons/fa";
import "../Register/Register.css";
import "../../components/Button/Button.css";
import "../../components/Input/Input.css";

const userSchema = object({
  username: string().required("Campo requerido"),
  email: string()
    .email("Introduce un email válido")
    .required("Campo requerido"),
  avatar: mixed().test('is-file', 'Por favor, sube un archivo de imagen', (value) => {
    return value instanceof File || value === null;
  }),
});

const EditProfile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [avatarUrl, setAvatarUrl] = useState(user.avatar);

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

      // Logging the avatar URL before sending it to the server
      console.log("Avatar URL before sending:", values.avatar);

      const data = new FormData();
      Object.keys(values).forEach((keyValue) => {
        if (keyValue === 'avatar') {
          if (values[keyValue] instanceof File) {
            data.append(keyValue, values[keyValue]);
          }
        } else {
          data.append(keyValue, values[keyValue]);
        }
      });

      editUser(user.id, data)
        .then(() => {
          setAvatarUrl(values.avatar ? URL.createObjectURL(values.avatar) : user.avatar);
          navigate("/user");
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
        <Link to={"/user"}>
          <FaArrowLeft className="exit-arrow" />
        </Link>
        <form onSubmit={handleSubmit}>
          <div className="userprofile-img">
            <img src={user.avatar} alt="profile_image" />

            <Input
              name="avatar"
              type="file"
              label="Sube una foto"
              error={touched.avatar && errors.avatar}
              onChange={(event) => {
                setFieldValue("avatar", event.currentTarget.files[0]);
              }}
              onBlur={handleBlur}
            />
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