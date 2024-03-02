import './Profile.css'
import '../../pages/Register/Register.css'


const Profile = ({ user }) => {
  return (
    
    <div className="background">
        <div className="profile-container">
            <div className="welcome">
            <div className="image-canva"></div>
            <h2>¡Hola @{user?.data?.username}!</h2>
            </div>
        </div>
    </div>
  )
}

export default Profile