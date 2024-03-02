import { useContext } from "react"
import AuthContext from '../../contexts/AuthContext'
import Profile from '../../components/Profile/Profile'

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  return (
    <Profile user={user}/>
  )
}

export default UserProfile
