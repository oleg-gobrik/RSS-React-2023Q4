import { createContext, useContext } from 'react';
import { ApiResponsePeople } from '../ApiResponse/ApiResponsePeople';

// searchObject and setSearchObject are in context,
// as it is required by the condition of the task module-3
export interface ISearchContext {
  searchValue: string;
  density: number;
  searchObject: ApiResponsePeople;
  setSearchObjectHandler: (value: ApiResponsePeople) => void;
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
