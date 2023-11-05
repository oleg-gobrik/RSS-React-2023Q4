import styles from './Paginator.module.css';
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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

  return (
    <div className={styles.paginator}>
      {arrayPages.map((item) => {
        const urlToNewPage = `${isPaginatorInUrl ? '..' : ''}/page/${item}`;
        const curPage = currentPage ? currentPage : 1;
        const classNamePageNumber =
          curPage === item ? styles.currentPage : styles.page;
        if (item < 5 || item > arrayPages[arrayPages.length - 5]) {
          return (
            <NavLink
              to={urlToNewPage}
              key={item}
              className={classNamePageNumber}
              //onClick={() => onClickHandler(item)}
            >
              {item}
            </NavLink>
          );
        } else {
          return;
        }
      })}
    </div>
  );
}
