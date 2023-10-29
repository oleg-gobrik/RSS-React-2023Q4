import React from 'react';
import styles from './CardListWrapper.module.css';
import CardList from '../CardList/CardList';
import Card from '../Card/Card';
import Paginator from '../Paginator/Paginator';
import { ApiResponsePeople } from '../../utils/ApiResponse/ApiResponsePeople';

type Props = {
  searchObject: ApiResponsePeople;
  isLoadingSearch: boolean;
  changeItemsHandler: (url: string) => void;
};

export default class CardListWrapper extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const { isLoadingSearch, searchObject, changeItemsHandler } = this.props;
    if (isLoadingSearch) {
      return (
        <Card>
          <p>Please wait, uploading data.</p>
        </Card>
      );
    } else {
      return (
        <section className={styles.cardListWrapper}>
          <CardList searchObject={searchObject} />
          <Paginator
            onChangePageHandler={changeItemsHandler.bind(this)}
            previousPage={searchObject.previous}
            nextPage={searchObject.next}
          />
        </section>
      );
    }
  }
}
