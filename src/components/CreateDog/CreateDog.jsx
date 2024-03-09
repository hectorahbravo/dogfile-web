import { useState } from 'react';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import Input from '../../components/Input/Input';
import { createDog, editDog } from '../../services/DogService.js';
import Button from '../../components/Button/Button';
import './CreateDog.css'; // Importa el archivo CSS para los estilos
import { useNavigate, useParams } from 'react-router-dom';

const dogSchema = object({
  name: string().required('Campo requerido'),
  birthdate: string(),
  weight: string().required('Campo requerido'),
  vaccines: string().oneOf(['vaccine1', 'vaccine2', 'vaccine3']),
  allergies: string(),
  foodType: string(),
  foodTimes: string(),
  foodKg: string(),
  temperament: string().oneOf(['Estable', 'Miedoso', 'Reactivo']),
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
      name: '',
      birthdate: '',
      weight: '',
      vaccines: '',
      allergies: '',
      foodType: '',
      foodTimes: '',
      foodKg: '',
      temperament: '',
      avatar: '',
      owner: userId,
    },
    onSubmit:  (values) => {
      console.log(values)
  
      if (isEdit) {
        editDog(values, userId, dogId)
          .then(() => {
            navigate('/user');
          })
          .catch((err) => console.error(err));
      } else {
        createDog(values)
          .then(() => {
            navigate('/user');
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
      setFieldValue('avatar', reader.result);
    };
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
          <div>
            <label htmlFor="vaccines">Vaccines</label>
            <select
              id="vaccines"
              name="vaccines"
              value={values.vaccines}
              onChange={handleChange}
              onBlur={handleBlur}
              className="dog-input"
            >
              <option value="">Select vaccine</option>
              <option value="vaccine1">Vaccine 1</option>
              <option value="vaccine2">Vaccine 2</option>
              <option value="vaccine3">Vaccine 3</option>
            </select>
            {touched.vaccines && errors.vaccines && (
              <div className="error-message">{errors.vaccines}</div>
            )}
          </div>
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
          <div>
            <label htmlFor="temperament">Temperament</label>
            <select
              id="temperament"
              name="temperament"
              value={values.temperament}
              onChange={handleChange}
              onBlur={handleBlur}
              className="dog-input"
            >
              <option value="">Select temperament</option>
              <option value="Estable">Estable</option>
              <option value="Miedoso">Miedoso</option>
              <option value="Reactivo">Reactivo</option>
            </select>
            {touched.temperament && errors.temperament && (
              <div className="error-message">{errors.temperament}</div>
            )}
          </div>
          <div>
            <label htmlFor="avatar">Avatar</label>
            <input
              id="avatar"
              name="avatar"
              type="file"
              onChange={handleAvatarChange}
              onBlur={handleBlur}
              className="dog-input"
            />
            {touched.avatar && errors.avatar && (
              <div className="error-message">{errors.avatar}</div>
            )}
          </div>
          <div className="container-buttons">
            <Button type="submit" className="btn-register" text={isEdit ? "Edit Dog" : "Create Dog"}  />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDog;
