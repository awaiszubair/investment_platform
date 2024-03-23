import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

function ProtectedRoutes({ children, ...props }) {
    const authStatus = useSelector((state) => state.auth.status);
    const [loader, setLoader] = useState(true);
    const { isAuthenticated } = useAuth0();
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }
        else {
            navigate(location.pathname);
        }
        setLoader(false);
    }, [isAuthenticated, loader])
    return (
        loader ? <CircularProgress color="primary" /> : <>{children}</>
    )
}

export default ProtectedRoutes