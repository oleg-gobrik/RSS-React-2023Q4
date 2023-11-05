import React from 'react';
import styles from './Button.module.css';
import { Props } from './types';

export default function Button(props: Props) {
  const { children, ...restProps } = props;
  return (
    <button className={styles.Button} {...restProps}>
      {children}
    </button>
  );
}
