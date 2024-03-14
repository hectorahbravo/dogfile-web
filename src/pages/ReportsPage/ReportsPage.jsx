import Reports from '../../components/Reports'
import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import './ReportPage.css'
const ReportsPage = () => {
    const { user } = useContext(AuthContext);
  
    return (
       <div className="background-reports-form">
        <div className="reports-form-container">
      <div className="map-report-form">
      <Reports />
      </div>  
      </div>
      </div>
     
    )
  }
  
  export default ReportsPage