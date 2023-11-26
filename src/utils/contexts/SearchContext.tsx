import { createContext, useContext } from 'react';
export interface ISearchContext {
  density: number;
  setValueDensity: (value: number) => void;
}

export const SearchContext = createContext<ISearchContext | undefined>(
  undefined
);

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearchContext must be inside a SearchContext.Provider');
  }
  return context;
};
