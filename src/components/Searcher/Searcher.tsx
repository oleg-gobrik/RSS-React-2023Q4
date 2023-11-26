import styles from './Searcher.module.css';
import CardList from '../CardList/CardList';
import Paginator from '../Paginator/Paginator';
import { ApiResponsePeople } from '../../utils/ApiResponse/ApiResponsePeople';

export default function Searcher({
  searchResult,
  pagesCount,
  pageNumber,
  children,
}: {
  searchResult: ApiResponsePeople;
  pagesCount: number;
  pageNumber: string | undefined;
  children?: React.ReactNode;
}) {
  return (
    <>
      <section className={styles.searcher}>
        <div className={styles.resultsContainer}>
          <CardList searchObject={searchResult} />
          <div className={styles.details}>{children}</div>
        </div>
        <Paginator
          countPages={pagesCount}
          currentPage={pageNumber ? +pageNumber : undefined}
        />
      </section>
    </>
  );
}
