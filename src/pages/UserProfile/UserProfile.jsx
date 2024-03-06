import { useContext } from "react"
import AuthContext from '../../contexts/AuthContext'
import Profile from '../../components/Profile/Profile'
import UserDogs from '../../components/UserDogs/UserDogs'
import './UserProfile.css'

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  return (
  <div className="background">
  <div className="user-container">
    <Profile user={user}/>
    <UserDogs/>
    </div>
    </div>
  )
}

export default UserProfile
