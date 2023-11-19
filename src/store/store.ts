import { configureStore, combineReducers } from '@reduxjs/toolkit';
import searchReducer from './searchSlice/searchSlice';
import searchResultReducer from './searchResultSlice/searchResultSlice';
import { searchAPI } from '../utils/services/SearchService';

const rootReducer = combineReducers({
  search: searchReducer,
  searchResult: searchResultReducer,
  [searchAPI.reducerPath]: searchAPI.reducer,
});
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(searchAPI.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
