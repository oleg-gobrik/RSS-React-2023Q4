import styles from './Card.module.css';
import { Props } from './types';
import { Link, useLocation } from 'react-router-dom';
import { getIdFromUrl } from '../../utils/ApiRequest/ApiRequestPeople';

export default function Card(props: Props) {
  const { value } = props;

  const id = getIdFromUrl(value.url);
  const location = useLocation();
  const isDetails = location.pathname.includes('/details/');
  const isPageNumber = location.pathname.includes('/page/');

  let resultUrl: string = '';
  if (isDetails) {
    resultUrl = `${location.pathname}/../${id}`;
  } else if (isPageNumber) {
    resultUrl = `${location.pathname}/details/${id}`;
  } else {
    resultUrl = `${location.pathname}details/${id}`;
  }

  // const urlToNewDetail = `${location.pathname}${isDetails ? '../../../' : ''}${
  //   isPageNumber && isDetails ? '.' : ''
  // }${isPageNumber ? '/' : ''}details/${id}`;

  return (
    <div className={styles.card}>
      <Link to={resultUrl} className={styles.link}>
        <div className={styles.container}>
          <span className={styles.parameter}>{value.name}</span>
        </div>
      </Link>
    </div>
  );
}
