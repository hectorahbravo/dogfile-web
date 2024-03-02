<<<<<<< HEAD
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import Profile from "../../components/Profile/Profile";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  return <Profile user={user} />;
};

export default UserProfile;
=======
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
>>>>>>> 7f7cf5b9c7d3fec31b2900ac7adaa8d8bca36e0b
