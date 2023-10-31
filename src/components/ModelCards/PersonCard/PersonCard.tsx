import styles from './PersonCard.module.css';
import Card from '../../Card/Card';
import React from 'react';
import { Props } from './types';

export default function PersonCard(props: Props) {
  const { value } = props;
  return (
    <Card>
      <div className={styles.person}>
        <div className={`${styles.container} ${styles.name}`}>
          <span className={styles.nameParameter}>Name:</span>
          <span className={styles.parameter}>{value.name}</span>
        </div>
        <div className={styles.gender}>
          <span className={styles.nameParameter}>Gender:</span>
          <span className={styles.parameter}>{value.gender}</span>
        </div>
        <div className={styles.size}>
          <div className={styles.container}>
            <span className={styles.nameParameter}>Height:</span>
            <span className={styles.parameter}>{value.height}</span>
          </div>
          <div className={styles.container}>
            <span className={styles.nameParameter}>Mass:</span>
            <span className={styles.parameter}>{value.mass}</span>
          </div>
        </div>
        <div className={styles.colors}>
          <div className={styles.container}>
            <span className={styles.nameParameter}>Skin color:</span>
            <span className={styles.parameter}>{value.skin_color}</span>
          </div>
          <div className={styles.container}>
            <span className={styles.nameParameter}>Eye color:</span>
            <span className={styles.parameter}>{value.eye_color}</span>
          </div>
          <div className={styles.container}>
            <span className={styles.nameParameter}>Hair color:</span>
            <span className={styles.parameter}>{value.hair_color}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
