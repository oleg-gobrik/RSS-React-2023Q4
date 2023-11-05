import { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { getPeopleParamById } from '../../utils/ApiRequest/ApiRequestPeople';
import {
  Person,
  initialPerson,
} from '../../utils/ApiResponse/ApiResponsePeople';
import styles from './CardDetails.module.css';
import Button from '../Button/Button';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

export default function CardDetails() {
  const { id } = useParams();
  const [personDetails, setPersonDetails] = useState<Person>(initialPerson);
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  useEffect(() => {
    if (id) {
      getPeopleParamById(id).then((result) => {
        setPersonDetails(result);
        setLoading(false);
      });
      setLoading(true);
    }
  }, [id]);
  return loading ? (
    <LoadingSpinner />
  ) : (
    <div>
      <div className={styles.person}>
        <div className={`${styles.container} ${styles.name}`}>
          <span className={styles.nameParameter}>Name:</span>
          <span className={styles.parameter}>{personDetails.name}</span>
        </div>
        <div className={styles.gender}>
          <span className={styles.nameParameter}>Gender:</span>
          <span className={styles.parameter}>{personDetails.gender}</span>
        </div>
        <div className={styles.size}>
          <div className={styles.container}>
            <span className={styles.nameParameter}>Height:</span>
            <span className={styles.parameter}>{personDetails.height}</span>
          </div>
          <div className={styles.container}>
            <span className={styles.nameParameter}>Mass:</span>
            <span className={styles.parameter}>{personDetails.mass}</span>
          </div>
        </div>
        <div className={styles.colors}>
          <div className={styles.container}>
            <span className={styles.nameParameter}>Skin color:</span>
            <span className={styles.parameter}>{personDetails.skin_color}</span>
          </div>
          <div className={styles.container}>
            <span className={styles.nameParameter}>Eye color:</span>
            <span className={styles.parameter}>{personDetails.eye_color}</span>
          </div>
          <div className={styles.container}>
            <span className={styles.nameParameter}>Hair color:</span>
            <span className={styles.parameter}>{personDetails.hair_color}</span>
          </div>
        </div>
      </div>
      <Button>
        <Link to={`${location.pathname}/../..`}>Close Details</Link>
      </Button>
    </div>
  );
}
