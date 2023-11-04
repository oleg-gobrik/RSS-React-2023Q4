import { createContext } from 'react';

export interface ISearchContext {
  searchValue: string;
  density: number;
}

export const SearchContext = createContext<ISearchContext>({
  searchValue: '',
  density: 10,
});
