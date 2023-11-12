import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { ApiResponsePeople } from './ApiResponse/ApiResponsePeople';
import { SearchContext } from './contexts/SearchContext';
import { render } from '@testing-library/react';
import ErrorMatchPage from '../components/ErrorMatchPage/ErrorMatchPage';

export interface ProviderProps {
  searchValue: string;
  density: number;
  searchObject: ApiResponsePeople;
  setSearchObjectHandler: (value: ApiResponsePeople) => void;
}

export const customRenderProviderWithSearchContext = (
  ui: React.ReactNode,
  { providerProps }: { providerProps: ProviderProps },
  pathname: string = '/'
) => {
  const router = createMemoryRouter([
    {
      path: pathname,
      element: (
        <SearchContext.Provider value={providerProps}>
          {ui}
        </SearchContext.Provider>
      ),
      errorElement: <ErrorMatchPage />,
    },
  ]);
  return render(<RouterProvider router={router} />);
};

export const testSearchPeople: ApiResponsePeople = {
  count: 1,
  next: null,
  previous: null,
  results: [
    {
      name: 'Anakin Skywalker',
      height: '188',
      mass: '84',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '41.9BBY',
      gender: 'male',
      url: 'https://swapi.dev/api/people/11/',
    },
  ],
};
export const testProviderProps = {
  searchValue: 'Anakin Skywalker',
  density: 10,
  searchObject: testSearchPeople,
  setSearchObjectHandler: jest.fn((value: ApiResponsePeople) => {
    testProviderProps.searchObject = value;
  }),
};
