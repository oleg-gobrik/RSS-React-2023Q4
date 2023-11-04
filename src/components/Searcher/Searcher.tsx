import styles from './Searcher.module.css';
import CardList from '../CardList/CardList';
import Paginator from '../Paginator/Paginator';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { useParams } from 'react-router-dom';
import { useEffect, useContext, useState } from 'react';
import { SearchContext } from '../../pages/SearchPage/SearchContext';
import { getSearchValue } from '../../utils/SearchLocalStorage';
import {
  initialResponsePeople,
  ApiResponsePeople,
} from '../../utils/ApiResponse/ApiResponsePeople';
import { getPeopleParamBySearchAndPage } from '../../utils/ApiRequest/ApiRequestPeople';

export default function Searcher() {
  const { density, searchValue } = useContext(SearchContext);
  const [responseValue, setResponseValue] = useState<ApiResponsePeople>(
    initialResponsePeople
  );
  const [isLoadingSearch, setIsLoadingSearch] = useState<boolean>(false);
  const { pageNumber } = useParams();

  const getItemsBySearchAndPage = (page?: number) => {
    getPeopleParamBySearchAndPage(
      getSearchValue(),
      page ? page.toString() : undefined
    ).then((result) => {
      setResponseValue(result);
      setIsLoadingSearch(false);
    });
    setResponseValue(initialResponsePeople);
    setIsLoadingSearch(true);
  };

  useEffect(() => {
    getPeopleParamBySearchAndPage(getSearchValue()).then((result) => {
      setResponseValue(result);
      setIsLoadingSearch(false);
    });
    setResponseValue(initialResponsePeople);
    setIsLoadingSearch(true);
  }, [searchValue]);

  useEffect(() => {
    pageNumber
      ? getItemsBySearchAndPage(+pageNumber)
      : getItemsBySearchAndPage();
  }, [pageNumber]);

  const pagesCount = Math.ceil(responseValue.count / density);

  {
    /** TODO: add component with selector 5 and 10 items to display on outlet */
  }

  return isLoadingSearch ? (
    <LoadingSpinner />
  ) : (
    <section className={styles.searcher}>
      <CardList searchObject={responseValue} />
      <Paginator
        countPages={pagesCount}
        currentPage={pageNumber ? +pageNumber : undefined}
        onClickHandler={getItemsBySearchAndPage}
      />
    </section>
  );
}
