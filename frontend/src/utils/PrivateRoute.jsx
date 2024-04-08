
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext';

export const PrivateRoute = ({Component, ...rest}) => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    
    useEffect(() => {
        if (!user) {
            navigate('/login', { replace: true });
        }
    }, [user, navigate]);

    return user ? <Component {...rest} /> : null 
}
