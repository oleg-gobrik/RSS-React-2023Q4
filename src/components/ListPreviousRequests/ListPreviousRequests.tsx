import React from 'react';
import styles from './ListPreviousRequests.module.css';
import { Props } from './types';

export default function ListPreviousRequests(props: Props) {
  const { previousRequests, onClickHandler } = props;
  return (
    <ul className={styles.listRequests}>
      {previousRequests &&
        previousRequests.map((item) => (
          <li key={item} id={item} onClick={() => onClickHandler(item)}>
            {item}
          </li>
        ))}
    </ul>
  );
}
