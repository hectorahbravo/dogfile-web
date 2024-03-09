import "./Profile.css";

const Profile = ({ user }) => {
  return (
    <div>
      <div className="image-canva ">
        <img src={user.avatar} alt="profile_picture" />
      </div>
      <h2 className="username">¡Hola {user.username}!</h2>
    </div>
  );
};

export default Profile;
