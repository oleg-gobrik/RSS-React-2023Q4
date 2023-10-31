import { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import {
  initialResponsePeople,
  ApiResponsePeople,
} from '../../utils/ApiResponse/ApiResponsePeople';
import CardListWrapper from '../../components/CardListWrapper/CardListWrapper';
import { getPeopleFullUrlAPI } from '../../utils/ApiRequest/ApiRequestPeople';

export default function PageSearchContainer() {
  const [searchValue, setSearchValue] = useState<ApiResponsePeople>(
    initialResponsePeople
  );
  const [isLoadingSearch, setIsLoadingSearch] = useState<boolean>(false);

  const requestToSearch = (value: ApiResponsePeople) => {
    setSearchValue(value);
    setIsLoadingSearch(false);
  };

  const toggleLoading = (value: boolean) => {
    setIsLoadingSearch(value);
  };

  const getItems = (url: string) => {
    const response: Promise<ApiResponsePeople> = getPeopleFullUrlAPI(url);
    response.then((result) => {
      setSearchValue(result);
      setIsLoadingSearch(false);
    });
    setSearchValue(initialResponsePeople);
    setIsLoadingSearch(true);
  };
  return (
    <>
      <SearchBar
        onSearchHandler={requestToSearch}
        loadingHandler={toggleLoading}
      />
      <CardListWrapper
        searchObject={searchValue}
        isLoadingSearch={isLoadingSearch}
        changeItemsHandler={getItems}
      />
    </>
  );
}
