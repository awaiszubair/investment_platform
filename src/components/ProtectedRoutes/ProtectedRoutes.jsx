import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

function ProtectedRoutes({ children }) {
    const authStatus = useSelector((state) => state.auth.status);
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        if (!authStatus) {
            return navigate('/login');
        }
        setTimeout(() => {
            setLoader(false)
        }, 2000);
    }, [authStatus, loader])
    return (
        loader ? <CircularProgress color="primary" /> : <>{children}</>
    )
}

export default ProtectedRoutes