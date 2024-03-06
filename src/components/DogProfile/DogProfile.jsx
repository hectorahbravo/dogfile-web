

const DogProfile = ({ dog }) => {
  return (
        <div className="welcome">
          <div className="image-canva"></div>
          <h2>¡Hola @{dog.name}!</h2>
        </div>
    
  );
};

export default DogProfile;