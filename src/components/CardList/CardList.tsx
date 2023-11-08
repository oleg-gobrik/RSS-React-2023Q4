import styles from './CardList.module.css';
import Card from '../Card/Card';
import { Props } from './types';

export default function CardList(props: Props) {
  const { searchObject } = props;
  if (searchObject.count === 0) {
    return <div>Nothing was found for this query.</div>;
  } else {
    return (
      <div className={styles.cardList}>
        {searchObject.results &&
          searchObject.results.map((item, index) => (
            <Card key={index} value={item} />
          ))}
      </div>
    );
  }
}
