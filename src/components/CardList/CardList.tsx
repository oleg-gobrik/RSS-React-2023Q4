import React from 'react';
import styles from './CardList.module.css';
import PersonCard from '../ModelCards/PersonCard/PersonCard';
import { Props } from './types';

export default function CardList(props: Props) {
  const { searchObject } = props;
  if (searchObject.count === 0) {
    return <div>Nothing was found for this query.</div>;
  } else {
    return (
      <div className={styles.cardList}>
        {searchObject.results!.map((item, index) => (
          <PersonCard key={index} value={item}></PersonCard>
        ))}
      </div>
    );
  }
}
