import React from 'react';
import styles from './CardListWrapper.module.css';
import CardList from '../CardList/CardList';
import Paginator from '../Paginator/Paginator';
import { Props } from './types';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

export default function CardListWrapper(props: Props) {
  const { isLoadingSearch, searchObject, changeItemsHandler } = props;
  return isLoadingSearch ? (
    <LoadingSpinner />
  ) : (
    <section className={styles.cardListWrapper}>
      <CardList searchObject={searchObject} />
      <Paginator
        onChangePageHandler={changeItemsHandler}
        previousPage={searchObject.previous}
        nextPage={searchObject.next}
      />
    </section>
  );
}
