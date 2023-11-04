import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SearchPage from '../pages/SearchPage/SearchPage';
import ErrorMatchPage from '../components/ErrorMatchPage/ErrorMatchPage';
import Searcher from '../components/Searcher/Searcher';

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
        },
        {
          path: 'page/:pageNumber/',
          element: <Searcher />,
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
