import SearchBar from '../../components/SearchBar/SearchBar';
import { SearchContext } from '../../utils/contexts/SearchContext';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ISearchContext } from '../../utils/contexts/SearchContext';
import {
  ApiResponsePeople,
  initialResponsePeople,
} from '../../utils/ApiResponse/ApiResponsePeople';

export default function SearchPage() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [density, setDensity] = useState<number>(10);
  const [searchObject, setSearchObject] = useState<ApiResponsePeople>(
    initialResponsePeople
  );
  const searchContextValue: ISearchContext = {
    searchValue,
    density,
    searchObject,
    setSearchObject,
  };
  return (
    <>
      <SearchContext.Provider value={searchContextValue}>
        <SearchBar
          setSearchValue={setSearchValue}
          setDensityValue={setDensity}
        />
        <Outlet />
      </SearchContext.Provider>
    </>
  );
}
