import styles from './Card.module.css';
import React from 'react';
import { Props } from './types';

export default function Card(props: Props) {
  return <div className={styles.card}>{props.children}</div>;
}
