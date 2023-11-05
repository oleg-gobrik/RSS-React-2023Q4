import { useState } from 'react';
import Button from '../Button/Button';
import styles from './ErrorButton.module.css';

export default function ErrorButton() {
  const [hasError, setHasError] = useState(false);
  const clickError = () => {
    setHasError(true);
  };
  if (hasError) {
    throw new Error('Test error boundary.');
  }
  return (
    <Button onClick={clickError}>
      <span className={styles.error}>Make Error</span>
    </Button>
  );
}
