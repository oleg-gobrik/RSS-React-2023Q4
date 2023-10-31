import styles from './Paginator.module.css';
import React from 'react';
import { Props } from './types';

export default function Paginator(props: Props) {
  const { nextPage, previousPage, onChangePageHandler } = props;
  return (
    <div className={styles.paginator}>
      {previousPage && (
        <button
          className={styles.buttonChangePage}
          onClick={() => onChangePageHandler(previousPage)}
        >
          Previous Page
        </button>
      )}
      {nextPage && (
        <button
          className={styles.buttonChangePage}
          onClick={() => onChangePageHandler(nextPage)}
        >
          Next Page
        </button>
      )}
    </div>
  );
}
