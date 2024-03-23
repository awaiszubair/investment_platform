import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import App from './App';
import Advance from './pages/Advance';
import Inform from './pages/Inform';
import Request from './pages/Request';
import Login from './components/Login';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import { Provider } from 'react-redux'
import store from './store/store.js'
import Sections from './Form/Sections.jsx';
import { Auth0Provider } from '@auth0/auth0-react';
import Checks from './Form/Checks/Check.jsx';
import Review from './Form/Review/Review.jsx';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/dashboard',
        element: (
          // <ProtectedRoutes>
          <Dashboard />
          // </ProtectedRoutes>
        )
      },
      {
        path: '/inform',
        element: (
          // <ProtectedRoutes>
          // {/* <About /> */}
          <Inform />
          // {/* </ProtectedRoutes> */}
        )
      },
      {
        path: '/review',
        element: (
          <Review />
        )
      },
      {
        path: '/advance',
        element: (
          // <ProtectedRoutes>
          // {/* <Contact /> */}
          <Advance />
          // {/* </ProtectedRoutes> */}
        )
      },
      {
        path: '/request/:token',
        element: (
          // <ProtectedRoutes>
          // {/* <Questionarrie /> */}
          // {/* <QuestionForm /> */}
          // {/* <HorizontalLinearStepper /> */}
          <Request />
          // </ProtectedRoutes>
        )
      },
      {
        path: '/request',
        element: (
          // <ProtectedRoutes>
          // {/* <Questionarrie /> */}
          // {/* <QuestionForm /> */}
          // {/* <HorizontalLinearStepper /> */}
          <Sections />
          // </ProtectedRoutes>
        )
      },
      {
        path: '/checks',
        element: (
          // <ProtectedRoutes>
          // {/* <Questionarrie /> */}
          // {/* <QuestionForm /> */}
          // {/* <HorizontalLinearStepper /> */}
          <Checks />
          // </ProtectedRoutes>
        )
      },
      {
        path: '/',
        element: <Login />
      },
    ]
  }
]

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <Auth0Provider
      domain='dev-u4wlev6elco8bq01.us.auth0.com'
      clientId='oBL5aqi3HfQYJndw9O26HKjJ3rvhDB0P'
      redirectUri={window.location.origin}
      audience='this is identifier'
      scope='openid profile email'
    >
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </Auth0Provider>

  </React.StrictMode >
);
