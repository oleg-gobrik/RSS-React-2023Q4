import styles from './PersonCard.module.css';
import Card from '../../Card/Card';
import React from 'react';
import { Props } from './types';
import { NavLink, useLocation } from 'react-router-dom';
import { getIdFromUrl } from '../../../utils/ApiRequest/ApiRequestPeople';

export default function PersonCard(props: Props) {
  const { value } = props;

  const id = getIdFromUrl(value.url);
  // const regExp: RegExp = /details/g;
  const location = useLocation();
  const isDetails = location.pathname.includes('/details/');
  const isPageNumber = location.pathname.includes('/page/');

  const urlToNewDetail = `${location.pathname}${isDetails ? '../../../' : ''}${
    isPageNumber && isDetails ? '.' : ''
  }${isPageNumber ? '/' : ''}details/${id}`;
  return (
    <Card>
      <NavLink to={urlToNewDetail} className={styles.person}>
        <div className={`${styles.container} ${styles.name}`}>
          <span className={styles.nameParameter}>Name:</span>
          <span className={styles.parameter}>{value.name}</span>
        </div>
      </NavLink>
    </Card>
  );
}
