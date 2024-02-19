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

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/basic" element={<Basic />} />
        <Route path="/inform" element={<Inform />} />
        <Route path="/advance" element={<Advance />} />
        <Route path='/request' element={<Request />} />
      </Routes>
    </>
  );
}

export default App;
