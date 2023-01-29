import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthProvider';
import Spinner from '../../Pages/Shared/Spinner/Spinner';


const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    let location = useLocation();

    if(loading)
    {
        return <Spinner></Spinner>
    }

    if(user)
    {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;