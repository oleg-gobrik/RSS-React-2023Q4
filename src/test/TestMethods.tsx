import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { SearchContext } from '../utils/contexts/SearchContext';
import { RenderOptions, render } from '@testing-library/react';
import { AppStore, RootState, setupStore } from '../store/store';
import { setupListeners } from '@reduxjs/toolkit/query';
import { Provider } from 'react-redux';
import { PreloadedState } from '@reduxjs/toolkit';

export interface ProviderProps {
  density: number;
}
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export const customRenderWithSearchContext = (
  ui: React.ReactNode,
  { providerProps }: { providerProps: ProviderProps },
  initialEntriesPathname: string = '/test',
  routePathnameUI: string = '/test',
  routePathnameEmpty: string = '/',
  {
    preloadedState = {},
    store = setupStore(preloadedState),
  }: ExtendedRenderOptions = {}
) => {
  setupListeners(store.dispatch);
  return {
    store,
    ...render(
      <Provider store={store}>
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
      </Provider>
    ),
  };
};

export const customRender = (
  ui: React.ReactNode,
  initialEntriesPathname: string = '/test',
  routePathnameUI: string = '/test',
  routePathnameEmpty: string = '/',
  { preloadedState = {}, store = setupStore(preloadedState) } = {}
) => {
  setupListeners(store.dispatch);
  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[initialEntriesPathname]}>
          <Routes>
            <Route path={routePathnameUI} element={ui} />
            <Route path={routePathnameEmpty} element={<span>Test</span>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    ),
  };
};
