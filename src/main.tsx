import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Root from './routes/Root.tsx';
import ControlledFormRoute from './routes/Form/ControlledFormRoute.tsx';
import UncontrolledFormRoute from './routes/Form/UncontrolledFormRoute.tsx';
import ErrorRoute from './routes/ErrorRoute.tsx';
import SavedForm from './routes/Form/SavedFormRoute.tsx';
import { setupStore } from './store/store';
import { Provider } from 'react-redux';

const store = setupStore();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorRoute />,
    children: [
      { path: '/', element: <SavedForm /> },
      { path: '/controlledForm', element: <ControlledFormRoute /> },
      { path: '/uncontrolledForm', element: <UncontrolledFormRoute /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
