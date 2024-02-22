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

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        )
      },
      {
        path: '/inform',
        element: (
          <ProtectedRoutes>
            {/* <About /> */}
            <Inform />
          </ProtectedRoutes>
        )
      },
      {
        path: '/advance',
        element: (
          <ProtectedRoutes>
            {/* <Contact /> */}
            <Advance />
          </ProtectedRoutes>
        )
      },
      {
        path: '/request',
        element: (
          <ProtectedRoutes>
            {/* <Questionarrie /> */}
            {/* <QuestionForm /> */}
            {/* <HorizontalLinearStepper /> */}
            <Request />
          </ProtectedRoutes>
        )
      },
      {
        path: '/login',
        element: <Login />
      },
    ]
  }
]

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
