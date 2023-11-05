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

  useEffect(() => {
    const originPagesCount: number = Math.ceil(responseValue.count / 10);
    const setValues = (result: ApiResponsePeople, isLoading: boolean) => {
      setResponseValue(result);
      setIsLoadingSearch(isLoading);
    };
    if (density === 20) {
      let responses: ApiResponsePeople = initialResponsePeople;
      if (!pageNumber) {
        Promise.all([
          getPeopleParamBySearchAndPage(getSearchValue()),
          getPeopleParamBySearchAndPage(getSearchValue(), '2'),
        ])
          .then((result) => {
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
            setValues(responses, false);
          })
          .catch((error) => alert(error.message));
        setValues(initialResponsePeople, true);
      } else {
        const dataRequests: Promise<ApiResponsePeople>[] = [
          2 * +pageNumber - 1,
          2 * +pageNumber,
        ]
          .filter((x) => x <= originPagesCount)
          .map((pageNumber) =>
            getPeopleParamBySearchAndPage(
              getSearchValue(),
              pageNumber.toString()
            )
          );
        Promise.all(dataRequests)
          .then((result) => {
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
            setValues(responses, false);
          })
          .catch((error) => alert(error.message));
        setValues(initialResponsePeople, true);
      }
    } else {
      if (!pageNumber) {
        getPeopleParamBySearchAndPage(getSearchValue())
          .then((result) => {
            setValues(result, false);
          })
          .catch((error) => alert(error.message));
        setValues(initialResponsePeople, true);
      } else {
        getPeopleParamBySearchAndPage(getSearchValue(), pageNumber)
          .then((result) => {
            setValues(result, false);
          })
          .catch((error) => alert(error.message));
        setValues(initialResponsePeople, true);
      }
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
