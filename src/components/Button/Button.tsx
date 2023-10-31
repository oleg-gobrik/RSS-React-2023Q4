import React from 'react';
import styles from './Button.module.css';
import { Props } from './types';

export default function Button(props: Props) {
  return (
    <button onClick={() => props.clickHandler()} className={styles.Button}>
      {props.children}
    </button>
  );
}
