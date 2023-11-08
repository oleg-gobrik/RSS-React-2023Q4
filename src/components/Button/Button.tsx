import styles from './Button.module.css';
import { Props } from './types';

export default function Button(props: Props) {
  const { children, ...buttonProps } = props;
  return (
    <button className={styles.Button} {...buttonProps}>
      {children}
    </button>
  );
}
