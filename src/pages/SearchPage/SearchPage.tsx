import SearchBar from '../../components/SearchBar/SearchBar';
import { SearchContext } from './SearchContext';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ISearchContext } from './SearchContext';

export default function SearchPage() {
  const [searchValue, setSearchValue] = useState<string>('');
  const searchContextValue: ISearchContext = {
    searchValue,
    density: 10,
  };
  return (
    <>
      <SearchContext.Provider value={searchContextValue}>
        <SearchBar setSearchValue={setSearchValue} />
        <Outlet />
      </SearchContext.Provider>
    </>
  );
}
