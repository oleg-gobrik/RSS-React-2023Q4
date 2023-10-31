import React from 'react';
import styles from './CardListWrapper.module.css';
import CardList from '../CardList/CardList';
import Card from '../Card/Card';
import Paginator from '../Paginator/Paginator';
import { Props } from './types';

export default function CardListWrapper(props: Props) {
  const { isLoadingSearch, searchObject, changeItemsHandler } = props;
  if (isLoadingSearch) {
    return (
      <Card>
        <p>Please wait, uploading data.</p>
      </Card>
    );
  } else {
    return (
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
}
