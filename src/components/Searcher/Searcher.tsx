import styles from './Searcher.module.css';
import CardList from '../CardList/CardList';
import Paginator from '../Paginator/Paginator';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { Outlet, useParams } from 'react-router-dom';
import { useEffect, useContext, useState } from 'react';
import { SearchContext } from '../../pages/SearchPage/SearchContext';
import { getSearchValue } from '../../utils/SearchLocalStorage';
import {
  initialResponsePeople,
  ApiResponsePeople,
  Person,
} from '../../utils/ApiResponse/ApiResponsePeople';
import { getPeopleParamBySearchAndPage } from '../../utils/ApiRequest/ApiRequestPeople';

export default function Searcher() {
  const { density, searchValue } = useContext(SearchContext);
  const [responseValue, setResponseValue] = useState<ApiResponsePeople>(
    initialResponsePeople
  );
  const [isLoadingSearch, setIsLoadingSearch] = useState<boolean>(false);
  const { pageNumber } = useParams();

  const pagesCount = Math.ceil(responseValue.count / density);
  const originPagesCount: number = Math.ceil(responseValue.count / 10);

  const processingResult = (result: ApiResponsePeople[]) => {
    let responses: ApiResponsePeople = initialResponsePeople;
    const allResults = result.reduce<Person[]>(
      (accumulator, item) => [...accumulator, ...(item.results || [])],
      []
    );
    responses = {
      count: result[0].count,
      results: allResults,
      previous: result[0].previous,
      next: result[0].next,
    };
    setResponseValue(responses);
  };

  useEffect(() => {
    if (density === 20) {
      const dataRequests: Promise<ApiResponsePeople>[] = [
        2 * +(pageNumber ? pageNumber : 1) - 1,
        2 * +(pageNumber ? pageNumber : 1),
      ]
        .filter((x) => x <= originPagesCount)
        .map((pageNumber) =>
          getPeopleParamBySearchAndPage(getSearchValue(), pageNumber.toString())
        );
      setIsLoadingSearch(true);
      Promise.all(dataRequests)
        .then((result) => processingResult(result))
        .catch((error) => console.log(error.message))
        .finally(() => setIsLoadingSearch(false));
    } else {
      setIsLoadingSearch(true);
      getPeopleParamBySearchAndPage(
        getSearchValue(),
        pageNumber ? pageNumber : undefined
      )
        .then((result) => {
          setResponseValue(result);
        })
        .catch((error) => console.log(error.message))
        .finally(() => setIsLoadingSearch(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, density, pageNumber]);

  return isLoadingSearch ? (
    <LoadingSpinner />
  ) : (
    <section className={styles.searcher}>
      <div className={styles.resultsContainer}>
        <CardList searchObject={responseValue} />
        <div className={styles.details}>
          <Outlet />
        </div>
      </div>
      <Paginator
        countPages={pagesCount}
        currentPage={pageNumber ? +pageNumber : undefined}
      />
    </section>
  );
}
