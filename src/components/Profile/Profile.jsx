
import "./Profile.css";

const Profile = ({ user }) => {
  return (
    <div>
      <div className="image-canva"></div>
      <h2>¡Hola {user.username}!</h2>
    </div>
  );
};

export default Profile;
