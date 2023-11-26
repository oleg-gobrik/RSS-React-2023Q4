import {
  configureStore,
  combineReducers,
  PreloadedState,
} from '@reduxjs/toolkit';
import searchReducer from './searchSlice/searchSlice';
import searchResultReducer from './searchResultSlice/searchResultSlice';
import { searchAPI } from './SearchService';
import { createWrapper } from 'next-redux-wrapper';

const rootReducer = combineReducers({
  search: searchReducer,
  searchResult: searchResultReducer,
  [searchAPI.reducerPath]: searchAPI.reducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(searchAPI.middleware),
    preloadedState,
  });
}

export const makeStore = () => {
  return setupStore();
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
