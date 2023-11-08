import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
  useEffect(() => {
    if (id) {
      setLoading(true);
      getPeopleParamById(id)
        .then((result) => {
          setPersonDetails(result);
        })
        .catch((error) => console.log(error.message))
        .finally(() => setLoading(false));
    }
  }, [id]);
  return loading ? (
    <LoadingSpinner />
  ) : (
    <div className={styles.detailsContainer}>
      <div className={styles.close}>
        <Button additionalClass={styles.closeButton}>
          <Link className={styles.link} to="..">
            Close
          </Link>
        </Button>
      </div>

      <div className={styles.container}>
        <span className={styles.nameParameter}>Name:</span>
        <span className={styles.parameter}>{personDetails.name}</span>
      </div>
      <div className={styles.container}>
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
  );
}
