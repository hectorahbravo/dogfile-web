import Recommendation from '../../components/Recommendation'
import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import './RecommendationPage.css'
const RecommendationPage = () => {
    const { user } = useContext(AuthContext);
  
    return (
        <div>
      <Recommendation />
      </div>
     
    )
  }
  
  export default RecommendationPage