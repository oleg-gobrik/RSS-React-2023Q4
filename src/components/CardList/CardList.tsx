import styles from './CardList.module.css';
import Card from '../Card/Card';
import { Props } from './types';

export default function CardList(props: Props) {
  const { searchObject } = props;
  return (
    <div className={styles.cardList}>
      {searchObject.count === 0 && <div>Nothing was found for this query.</div>}
      {searchObject.results &&
        searchObject.results.map((item, index) => (
          <Card key={index} value={item} />
        ))}
    </div>
  );
}
