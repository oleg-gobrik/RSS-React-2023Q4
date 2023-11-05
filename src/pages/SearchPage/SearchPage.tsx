import SearchBar from '../../components/SearchBar/SearchBar';
import { SearchContext } from './SearchContext';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ISearchContext } from './SearchContext';

export default function SearchPage() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [density, setDensity] = useState<number>(10);
  const searchContextValue: ISearchContext = {
    searchValue,
    density,
  };
  return (
    <>
      <SearchContext.Provider value={searchContextValue}>
        <SearchBar setSearchValue={setSearchValue} setDensityValue={setDensity} />
        <Outlet />
      </SearchContext.Provider>
    </>
  );
}
