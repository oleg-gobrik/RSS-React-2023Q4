import {
  configureStore,
  combineReducers,
  PreloadedState,
} from '@reduxjs/toolkit';
import searchReducer from './searchSlice/searchSlice';
import searchResultReducer from './searchResultSlice/searchResultSlice';
import { searchAPI } from '../utils/services/SearchService';

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

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
