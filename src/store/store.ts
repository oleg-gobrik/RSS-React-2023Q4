import {
  configureStore,
  combineReducers,
  PreloadedState,
} from '@reduxjs/toolkit';
import formDataReducer from './formDataSlice/formDataSlice';

const rootReducer = combineReducers({
  formData: formDataReducer,
});
export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
