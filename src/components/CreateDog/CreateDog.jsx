import { useState } from "react";
import { array, object, string } from "yup";
import { useFormik } from "formik";
import Input from "../../components/Input/Input";
import { createDog, editDog } from "../../services/DogService.js";
import Button from "../../components/Button/Button";
import "./CreateDog.css";
import { useNavigate, useParams } from "react-router-dom";

const dogSchema = object({
  name: string().required("Campo requerido"),
  birthdate: string(),
  weight: string().required("Campo requerido"),
  vaccines: array(),
  allergies: string(),
  foodType: string(),
  foodTimes: string(),
  foodKg: string(),
  temperament: string(),
  avatar: string(),
});

const CreateDog = ({ initialValues, isEdit }) => {
  const { userId, dogId } = useParams();
  const navigate = useNavigate();
  const [avatarFile, setAvatarFile] = useState(null);

  const {
    values,
    errors,
    touched,
    isValid,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues || {
      name: "",
      birthdate: "",
      weight: "",
      vaccines: [],
      allergies: "",
      foodType: "",
      foodTimes: "",
      foodKg: "",
      temperament: "",
      avatar: "",
      owner: userId,
    },
    onSubmit: (values) => {
      console.log(values);

      if (isEdit) {
        editDog(values, userId, dogId)
          .then(() => {
            console.log("Dog edited successfully");
            navigate("/user");
          })
          .catch((err) => console.error(err));
      } else {
        createDog(values)
          .then(() => {
            console.log("Dog created successfully");
            navigate("/user");
          })
          .catch((err) => console.error(err));
      }
    },
    validationSchema: dogSchema,
    validateOnBlur: true,
    validateOnMount: true,
  });

  const handleAvatarChange = (event) => {
    const file = event.currentTarget.files[0];
    setAvatarFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFieldValue("avatar", reader.result);
    };
  };

  const handleCheckboxChange = (event) => {
    const { value } = event.target;

    if (values.vaccines && values.vaccines.includes(value)) {
      setFieldValue(
        "vaccines",
        values.vaccines.filter((v) => v !== value)
      );
    } else {
      setFieldValue("vaccines", [...values.vaccines, value]);
    }
  };

  return (
    <div className="background">
      <div className="dog-create-container">
        <form onSubmit={handleSubmit}>
          <Input
            name="name"
            label="Name"
            placeholder="Enter name"
            value={values.name}
            error={touched.name && errors.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className="dog-input"
          />
          <Input
            name="birthdate"
            type="date"
            label="Birthdate"
            value={values.birthdate}
            error={touched.birthdate && errors.birthdate}
            onChange={handleChange}
            onBlur={handleBlur}
            className="dog-input"
          />
          <Input
            name="weight"
            label="Weight"
            placeholder="Enter weight"
            value={values.weight}
            error={touched.weight && errors.weight}
            onChange={handleChange}
            onBlur={handleBlur}
            className="dog-input"
          />
<div className="container-vaccines">
          <label className="label-selector">Vacunas</label>
          <div className="checkbox">

            <label>
            Parvovirus y Moquillo
              <input
                type="checkbox"
                name="vaccines"
                value="Parvovirus y Moquillo"
                checked={
                  values.vaccines && values.vaccines.includes("Parvovirus y Moquillo")
                }
                onChange={handleCheckboxChange}
              />
            </label></div>
            <div className="checkbox"><label>
              Polivalente canina
              <input
                type="checkbox"
                name="vaccines"
                value="Polivalente canina"
                checked={
                  values.vaccines && values.vaccines.includes("Polivalente canina")
                }
                onChange={handleCheckboxChange}
              />
            </label></div>
            <div className="container-vaccines">
            <div className="checkbox"><label>
              Rabia
              <input
                type="checkbox"
                name="vaccines"
                value="Rabia"
                checked={
                  values.vaccines && values.vaccines.includes("Rabia")
                }
                onChange={handleCheckboxChange}
              />
            </label></div>
            <div className="checkbox"><label>
              Pol. Rabia
              <input
                type="checkbox"
                name="vaccines"
                value="Pol. Rabia"
                checked={
                  values.vaccines && values.vaccines.includes("Pol. Rabia")
                }
                onChange={handleCheckboxChange}
              />
            </label>
          </div></div></div>
          {touched.vaccines && errors.vaccines && (
            <div className="error-message">{errors.vaccines}</div>
          )}
          <Input
            name="allergies"
            label="Allergies"
            placeholder="Enter allergies"
            value={values.allergies}
            error={touched.allergies && errors.allergies}
            onChange={handleChange}
            onBlur={handleBlur}
            className="dog-input"
          />
          <Input
            name="foodType"
            label="Food Type"
            placeholder="Enter food type"
            value={values.foodType}
            error={touched.foodType && errors.foodType}
            onChange={handleChange}
            onBlur={handleBlur}
            className="dog-input"
          />
          <Input
            name="foodTimes"
            label="Food Times"
            placeholder="Enter food times"
            value={values.foodTimes}
            error={touched.foodTimes && errors.foodTimes}
            onChange={handleChange}
            onBlur={handleBlur}
            className="dog-input"
          />
          <Input
            name="foodKg"
            label="Food Kg"
            placeholder="Enter food kg"
            value={values.foodKg}
            error={touched.foodKg && errors.foodKg}
            onChange={handleChange}
            onBlur={handleBlur}
            className="dog-input"
          />
          <label htmlFor="temperament" className="label-selector">
            Temperament
          </label>
          <select
            id="temperament"
            name="temperament"
            value={values.temperament}
            onChange={handleChange}
            onBlur={handleBlur}
            className="dog-input-selector"
          >
            <option value="">Select temperament</option>
            <option value="Estable">Estable</option>
            <option value="Miedoso">Miedoso</option>
            <option value="Reactivo">Reactivo</option>
          </select>
          {touched.temperament && errors.temperament && (
            <div className="error-message">{errors.temperament}</div>
          )}
          <div className="input-avatar">
            <label htmlFor="avatar">Avatar</label>
            <input
              id="avatar"
              name="avatar"
              type="file"
              onChange={handleAvatarChange}
              onBlur={handleBlur}
            />
            {touched.avatar && errors.avatar && (
              <div className="error-message">{errors.avatar}</div>
            )}
          </div>
          <div className="container-buttons">
            <Button
              type="submit"
              className="btn-register"
              text={isEdit ? "Edit Dog" : "Create Dog"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDog;
