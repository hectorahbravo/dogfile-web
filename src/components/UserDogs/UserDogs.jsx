import { useState, useEffect, useContext } from 'react';
import { getUserDogs } from '../../services/UserService';
import DogProfile from '../DogProfile/DogProfile';
import AuthContext from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const UserDogs = () => {
  const { user } = useContext(AuthContext);



  return (
    <div>
      {user.dogs.map(dog => (
          <DogProfile key={dog.id} dog={dog} />
        
      ))}
    </div>
  );
};

export default UserDogs;