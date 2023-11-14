import {
  MemoryRouter,
  Route,
  RouterProvider,
  Routes,
  createMemoryRouter,
} from 'react-router-dom';
import { ApiResponsePeople, Person } from './ApiResponse/ApiResponsePeople';
import { SearchContext } from './contexts/SearchContext';
import { render } from '@testing-library/react';
import ErrorMatchPage from '../components/ErrorMatchPage/ErrorMatchPage';

export const testMockIdPerson = '4';
export const testMockPerson: Person = {
  name: 'Darth Vader',
  eye_color: 'yellow',
  gender: 'male',
  hair_color: 'none',
  url: 'https://swapi.dev/api/people/4/',
  birth_year: '41.9BBY',
  height: '202',
  mass: '136',
  skin_color: 'white',
};
export const testMockPeople: ApiResponsePeople = {
  count: 1,
  next: null,
  previous: null,
  results: [{ ...testMockPerson }],
};

export const testMockProviderProps = {
  searchValue: 'Darth Vader',
  density: 10,
  searchObject: testMockPeople,
  setSearchObjectHandler: jest.fn((value: ApiResponsePeople) => {
    testMockProviderProps.searchObject = value;
  }),
};
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

export const customRenderWithSearchContext = (
  ui: React.ReactNode,
  { providerProps }: { providerProps: ProviderProps },
  initialEntriesPathname: string = '/test',
  routePathnameUI: string = '/test',
  routePathnameEmpty: string = '/'
) => {
  return render(
    <MemoryRouter initialEntries={[initialEntriesPathname]}>
      <Routes>
        <Route
          path={routePathnameUI}
          element={
            <SearchContext.Provider value={providerProps}>
              {ui}
            </SearchContext.Provider>
          }
        />
        <Route path={routePathnameEmpty} element={<span>Test</span>} />
      </Routes>
    </MemoryRouter>
  );
};
