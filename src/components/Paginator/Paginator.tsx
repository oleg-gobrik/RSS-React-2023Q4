import styles from './Paginator.module.css';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Props } from './types';

export default function Paginator(props: Props) {
  const { countPages, currentPage } = props;
  const [arrayPages, setArrayPages] = useState<number[]>([]);
  const location = useLocation();

  useEffect(() => {
    const array: number[] = [];
    for (let i: number = 1; i <= countPages; i++) {
      array.push(i);
    }
    setArrayPages(array);
  }, [countPages]);

  const isPaginatorInUrl = location.pathname.includes('/page/');
  const pathPage = isPaginatorInUrl
    ? location.pathname.split('/page/').shift()
    : '';

  return (
    <div className={styles.paginator}>
      {arrayPages.map((item) => {
        const urlToNewPage = `${pathPage}/page/${item}`;
        const curPage = currentPage ? currentPage : 1;
        const classNamePageNumber =
          curPage === item ? styles.currentPage : styles.page;
        if (item < 6 || item > arrayPages[arrayPages.length - 6]) {
          return (
            <Link to={urlToNewPage} key={item} className={classNamePageNumber}>
              {item}
            </Link>
          );
        } else {
          return;
        }
      })}
    </div>
  );
}
