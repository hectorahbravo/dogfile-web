import Register from "../Register/Register";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getUser, editUser } from "../../services/UserService";

const EditProfile = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
  
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      setLoading(true);
      getUser(userId)
        .then((userDB) => {
          setUser(userDB);
        })
        .catch(error => {
          console.error("Error fetching user:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [userId]);
  
    const onSubmit = (values) => {
        console.log('entro2')
      editUser(userId, values)
        .then(editedUser => {
            navigate(`/users/${editedUser.id}`);
        })
        .catch(error => {
          console.error("Error editing user:", error);
        });
    };
  
    return (
      <div>
        <h1>Editar Perfil</h1>
  
        {loading ? (
          <p>Cargando...</p>
        ) : (
          user && <Register initialValues={user} onSubmit={onSubmit} isEdit={true} />
        )}
        
      </div>
    );
};

export default EditProfile;
