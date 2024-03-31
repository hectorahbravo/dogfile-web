import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { activateVet } from '../services/VetService';
const ActivationVet = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        activateVet(token)
            .then(() => {
                navigate('/login/vets');
            })
            .catch(err => {
                console.error('Error during activation', err);
            });
    }, [token, navigate]);
    return <div>Activating...</div>;
};
export default ActivationVet;