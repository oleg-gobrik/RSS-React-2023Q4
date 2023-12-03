import { FC } from 'react';
import styles from './ErrorInput.module.css';

export const ErrorInput: FC<{
  textMessage: string;
  isValid: boolean;
  isShow: boolean;
}> = ({ textMessage, isValid, isShow }) => {
  return (
    <>
      {!isValid && isShow && (
        <span className={styles.errorInput}>{textMessage}</span>
      )}
    </>
  );
};

export default ErrorInput;
