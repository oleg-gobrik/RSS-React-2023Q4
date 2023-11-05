import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SearchPage from '../pages/SearchPage/SearchPage';
import ErrorMatchPage from '../components/ErrorMatchPage/ErrorMatchPage';
import Searcher from '../components/Searcher/Searcher';
import CardDetails from '../components/CardDetails/CardDetails';

export default function RouterSearch() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <SearchPage />,
      errorElement: <ErrorMatchPage />,
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
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
