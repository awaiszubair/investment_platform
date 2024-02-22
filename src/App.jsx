import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard'
import Basic from './pages/Basic'
import Advance from './pages/Advance';
import Inform from './pages/Inform';
import Request from './pages/Request';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { login, logout } from './store/authSlice';

function App() {

  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status)
  const dispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(login())
    }
    else {
      dispatch(logout())
    }
  }, [authStatus])
  return (
    <>
      {!authStatus ?
        <>
          <main className='main'><Outlet /></main>
        </>
        :
        <>
          <Outlet />
        </>
      }

    </>
  );
}

export default App;
