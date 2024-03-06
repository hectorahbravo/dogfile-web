import { useContext } from "react"
import AuthContext from '../../contexts/AuthContext'
import DogProfile from '../../components/DogProfile/DogProfile'
import './DogProfile.css'

const DogProfilePage = () => {
  const { dog } = useContext(AuthContext);

  return (
  <div className="background">
  <div className="user-container">
    <DogProfile user={dog}/>
    </div>
    </div>
  )
}

export default DogProfilePage
