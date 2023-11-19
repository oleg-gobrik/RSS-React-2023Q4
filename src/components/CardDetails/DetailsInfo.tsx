import { Link } from 'react-router-dom';
import styles from './CardDetails.module.css';
import Button from '../Button/Button';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { searchAPI } from '../../utils/services/SearchService';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  setIsLoadingPerson,
  setPerson,
} from '../../store/searchResultSlice/searchResultSlice';
import { useEffect } from 'react';

export default function DetailsInfo({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const details = useAppSelector((state) => state.searchResult.personDetails);

  const {
    data: personDetails,
    error,
    isFetching,
  } = searchAPI.useFetchPersonQuery(id);

  useEffect(() => {
    if (isFetching) {
      dispatch(setIsLoadingPerson());
    }
    if (personDetails) {
      dispatch(setPerson({ personDetails }));
    }
  }, [personDetails, dispatch, isFetching]);
  return (
    <>
      {error && <h1>Something was wrong!</h1>}
      {isFetching ? (
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
      )}
    </>
  );
}
