import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ApiResponsePeople } from '../utils/ApiResponse/ApiResponsePeople';
import { SearchContext } from '../utils/contexts/SearchContext';
import { render } from '@testing-library/react';

export interface ProviderProps {
  searchValue: string;
  density: number;
  searchObject: ApiResponsePeople;
  setSearchObjectHandler: (value: ApiResponsePeople) => void;
}

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
