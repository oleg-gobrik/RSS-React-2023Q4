import styles from './Searcher.module.css';
import CardList from '../CardList/CardList';
import Paginator from '../Paginator/Paginator';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { Outlet, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSearchContext } from '../../utils/contexts/SearchContext';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchSearch } from '../../store/searchResultSlice/searchResultSlice';
import ErrorPage from '../../pages/ErrorPage/ErrorPage';

export default function Searcher() {
  const { density } = useSearchContext();

  const searchValue = useAppSelector((state) => state.search.searchValue);
  const searchResult = useAppSelector((state) => state.searchResult);
  const dispatch = useAppDispatch();
  const { pageNumber } = useParams();

  const pagesCount = Math.ceil(searchResult.searchResponse.count / density);
  const originPagesCount: number = Math.ceil(
    searchResult.searchResponse.count / 10
  );

  useEffect(() => {
    if (density === 20) {
      dispatch(
        fetchSearch({
          search: searchValue,
          page: pageNumber ? pageNumber : undefined,
          limit: 20,
          originPagesCount,
        })
      );
    } else {
      dispatch(
        fetchSearch({
          search: searchValue,
          page: pageNumber ? pageNumber : undefined,
          limit: 10,
          originPagesCount,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, density, pageNumber]);

  return (
    <>
      {searchResult.isLoadingSearch ? (
        <LoadingSpinner />
      ) : (
        <section className={styles.searcher}>
          <div className={styles.resultsContainer}>
            <CardList searchObject={searchResult.searchResponse} />
            <div className={styles.details}>
              <Outlet />
            </div>
          </div>
          <Paginator
            countPages={pagesCount}
            currentPage={pageNumber ? +pageNumber : undefined}
          />
        </section>
      )}
      {searchResult.errors.searchResponse && <ErrorPage />}
    </>
  );
}
