'use client';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { setupStore } from '../store/store';
import { ISearchContext, SearchContext } from '../utils/contexts/SearchContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  const store = setupStore();
  const [density, setDensity] = useState<number>(10);
  const setValueDensity = (value: number) => {
    setDensity(value);
  };
  const searchContextValue: ISearchContext = {
    density,
    setValueDensity,
  };

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <SearchContext.Provider value={searchContextValue}>
          {children}
        </SearchContext.Provider>
      </Provider>
    </ErrorBoundary>
  );
}
