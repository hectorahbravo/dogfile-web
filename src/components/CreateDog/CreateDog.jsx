import { useState } from 'react';
import { object, string, mixed } from 'yup';
import { useFormik } from 'formik';
import Input from '../../components/Input/Input';
import { createDog } from '../../services/DogService.js'
import Button from '../../components/Button/Button';
import './CreateDog.css'
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
  avatar: mixed(),
});

const CreateDog = () => {
    const { userId: userId } = useParams();
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
    initialValues: {
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
      owner:"",
    },
    onSubmit: (values) => {
        console.log({...values, owner:userId})
    
       
        
        createDog({...values, owner:userId})
          .then(() => {
            console.log('hola')
            navigate('/user');
        })
        .catch((err) => console.error(err));
    },
    validationSchema: dogSchema,
    validateOnBlur: true,
    validateOnMount: true,
  });

  const handleAvatarChange = (event) => {
    setFieldValue('avatar', event.currentTarget.files[0]);
    setAvatarFile(event.currentTarget.files[0]);
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
          <Input
            name="vaccines"
            label="Vaccines"
            placeholder="Enter vaccines"
            value={values.vaccines}
            error={touched.vaccines && errors.vaccines}
            onChange={handleChange}
            onBlur={handleBlur}
            className="dog-input"
          />
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
          <div className="container-buttons">
            <Button type="submit" className="btn-register" text="Create Dog" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDog;
