import "./VetProfile.css";

const VetProfile = ({ vet }) => {
  // Verificación de nulidad para evitar errores si vet es null
  if (!vet) {
    return null; // O cualquier otro comportamiento que desees en este caso
  }

  return (
    <div className="container-profile">
      <div className="image-canva">
        {/* Verificación de nulidad para acceder a vet.avatar */}
        {vet.avatar && <img src={vet.avatar} alt="profile_picture" />}
      </div>
      <h2 className="username">¡Hola {vet.name}!</h2>
    </div>
  );
};

export default VetProfile;
