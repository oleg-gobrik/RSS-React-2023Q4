import styles from './ListPreviousRequests.module.css';
import { Props } from './types';

export default function ListPreviousRequests({
  previousRequests,
  onClickHandler,
}: Props) {
  return (
    <>
      {previousRequests && previousRequests.length !== 0 && (
        <ul className={styles.listRequests}>
          {previousRequests.map((item) => (
            <li key={item} id={item} onClick={() => onClickHandler(item)}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
