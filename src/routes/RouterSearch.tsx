import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SearchPage from '../pages/SearchPage/SearchPage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import Searcher from '../components/Searcher/Searcher';
import CardDetails from '../components/CardDetails/CardDetails';

export const routerSearchConfig = [
  {
    path: '/',
    element: <SearchPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Searcher />,
        children: [
          {
            path: 'details/:id',
            element: <CardDetails />,
          },
        ],
      },
      {
        path: 'page/:pageNumber/',
        element: <Searcher />,
        children: [
          {
            path: 'details/:id',
            element: <CardDetails />,
          },
        ],
      },
    ],
  },
];

export default function RouterSearch() {
  const router = createBrowserRouter(routerSearchConfig);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
