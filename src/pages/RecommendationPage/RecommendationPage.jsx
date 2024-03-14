import Recommendation from '../../components/Recommendation'
import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import './RecommendationPage.css'
const RecommendationPage = () => {
    const { user } = useContext(AuthContext);
  
    return (
       <div className="background-recommendation-form">
        <div className="recommendation-form-container">
      <div className="map-recommendation-form">
      <Recommendation />
      </div>  
      </div>
      </div>
     
    )
  }
  
  export default RecommendationPage