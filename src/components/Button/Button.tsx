import styles from './Button.module.css';
import { Props } from './types';

export default function Button(props: Props) {
  const { children, additionalClass, ...buttonProps } = props;
  return (
    <button
      className={
        additionalClass ? `${styles.Button} ${additionalClass}` : styles.Button
      }
      {...buttonProps}
    >
      {children}
    </button>
  );
}
