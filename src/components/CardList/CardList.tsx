import React from 'react';
import styles from './CardList.module.css';
import { ApiResponsePeople } from '../../utils/ApiResponse/ApiResponsePeople';
import PersonCard from '../ModelCards/PersonCard/PersonCard';

interface Props {
  searchObject: ApiResponsePeople;
}

export default class CardList extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const { searchObject } = this.props;
    if (searchObject.count === 0) {
      return <div>Nothing was found for this query.</div>;
    } else {
      return (
        <div className={styles.cardList}>
          {searchObject.results!.map((item, index) => (
            <PersonCard key={index} value={item}></PersonCard>
          ))}
        </div>
      );
    }
  }
}
