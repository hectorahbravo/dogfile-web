import { useContext } from "react"
import AuthContext from '../../contexts/AuthContext'
import DogProfile from '../../components/DogProfile/DogProfile'
import './DogProfilePage.css'

const DogProfilePage = () => {
  const { dog } = useContext(AuthContext);

  return (
    <DogProfile user={dog}/>
  )
}

export default DogProfilePage
