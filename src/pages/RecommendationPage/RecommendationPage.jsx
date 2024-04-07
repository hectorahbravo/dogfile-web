import Recommendation from "../../components/Recommendation";
import "./RecommendationPage.css";
const RecommendationPage = () => {
  return (
    <div className="background-recommendation-form">
      <div className="recommendation-form-container">
        <div className="map-recommendation-form">
          <Recommendation />
        </div>
      </div>
    </div>
  );
};

export default RecommendationPage;
