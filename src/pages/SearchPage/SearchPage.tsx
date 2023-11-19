import SearchBar from '../../components/SearchBar/SearchBar';
import { SearchContext } from '../../utils/contexts/SearchContext';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ISearchContext } from '../../utils/contexts/SearchContext';

export default function SearchPage() {
  const [density, setDensity] = useState<number>(10);
  const searchContextValue: ISearchContext = {
    density,
  };
  return (
    <>
      <SearchContext.Provider value={searchContextValue}>
        <SearchBar setDensityValue={setDensity} />
        <Outlet />
      </SearchContext.Provider>
    </>
  );
}
