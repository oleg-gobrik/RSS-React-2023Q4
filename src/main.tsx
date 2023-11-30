import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Root /*, { loader as savedFormLoader }*/ from './routes/Root.tsx';
import ControlledFormRoute from './routes/Form/ControlledFormRoute.tsx';
import UncontrolledFormRoute from './routes/Form/UncontrolledFormRoute.tsx';
import ErrorRoute from './routes/ErrorRoute.tsx';
import SavedForm from './routes/Form/SavedFormRoute.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorRoute />,
    children: [
      { path: '/', element: <SavedForm /> /*, loader: savedFormLoader */ },
      { path: '/controlledForm', element: <ControlledFormRoute /> },
      { path: '/uncontrolledForm', element: <UncontrolledFormRoute /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
