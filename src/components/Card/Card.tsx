import styles from './Card.module.css';
import { Props } from './types';
import { Link, useLocation } from 'react-router-dom';

export default function Card(props: Props) {
  const { value } = props;

  const id = value.url.slice(0, -1).split('/').pop();
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
