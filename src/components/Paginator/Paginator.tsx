import styles from './Paginator.module.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Props } from './types';

export default function Paginator({ countPages, currentPage }: Props) {
  const [arrayPages, setArrayPages] = useState<number[]>([]);
  const pathname = usePathname();
  useEffect(() => {
    const array: number[] = [];
    for (let i: number = 1; i <= countPages; i++) {
      array.push(i);
    }
    setArrayPages(array);
  }, [countPages]);

  const isPaginatorInUrl = pathname.includes('/page/');
  const pathPage = isPaginatorInUrl ? pathname.split('/page/').shift() : '';

  return (
    <div className={styles.paginator}>
      {arrayPages.map((item) => {
        const urlToNewPage = `${pathPage}/page/${item}`;
        const curPage = currentPage ? currentPage : 1;
        const classNamePageNumber =
          curPage === item ? styles.currentPage : styles.page;
        if (item < 6 || item > arrayPages[arrayPages.length - 6]) {
          return (
            <Link
              href={urlToNewPage}
              key={item}
              className={classNamePageNumber}
            >
              {item}
            </Link>
          );
        }
      })}
    </div>
  );
}
