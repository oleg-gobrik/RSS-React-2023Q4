import styles from './CardDetails.module.css';
import Link from 'next/link';
import Button from '../Button/Button';
import { Person } from '../../utils/ApiResponse/ApiResponsePeople';
import { useRouter } from 'next/router';

export default function Details({ details }: { details: Person }) {
  const router = useRouter();
  const newUrl = router.asPath.concat('/../..');
  return (
    <div className={styles.detailsContainer}>
      <div className={styles.close}>
        <Button additionalClass={styles.closeButton}>
          <Link className={styles.link} href={newUrl}>
            Close
          </Link>
        </Button>
      </div>
      <div className={styles.container}>
        <span className={styles.nameParameter}>Name:</span>
        <span className={styles.parameter}>{details.name}</span>
      </div>
      <div className={styles.container}>
        <span className={styles.nameParameter}>Gender:</span>
        <span className={styles.parameter}>{details.gender}</span>
      </div>
      <div className={styles.size}>
        <div className={styles.container}>
          <span className={styles.nameParameter}>Height:</span>
          <span className={styles.parameter}>{details.height}</span>
        </div>
        <div className={styles.container}>
          <span className={styles.nameParameter}>Mass:</span>
          <span className={styles.parameter}>{details.mass}</span>
        </div>
      </div>
      <div className={styles.colors}>
        <div className={styles.container}>
          <span className={styles.nameParameter}>Skin color:</span>
          <span className={styles.parameter}>{details.skin_color}</span>
        </div>
        <div className={styles.container}>
          <span className={styles.nameParameter}>Eye color:</span>
          <span className={styles.parameter}>{details.eye_color}</span>
        </div>
        <div className={styles.container}>
          <span className={styles.nameParameter}>Hair color:</span>
          <span className={styles.parameter}>{details.hair_color}</span>
        </div>
      </div>
    </div>
  );
}
