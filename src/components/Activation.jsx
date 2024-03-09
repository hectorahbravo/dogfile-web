import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { activateUser } from '../services/UserService';
const Activation = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        activateUser(token)
            .then(() => {
                navigate('/');
            })
            .catch(err => {
                console.error('Error during activation', err);
            });
    }, [token, navigate]);
    return <div>Activating...</div>;
};
export default Activation;