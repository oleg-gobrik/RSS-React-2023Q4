import styles from './Paginator.module.css';
import React from 'react';

type Props = {
  nextPage: string | null;
  previousPage: string | null;
  onChangePageHandler: (url: string) => void;
};

export default class Paginator extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { nextPage, previousPage, onChangePageHandler } = this.props;
    return (
      <div className={styles.paginator}>
        {previousPage ? (
          <button
            className={styles.buttonChangePage}
            onClick={() => onChangePageHandler(previousPage)}
          >
            Previous Page
          </button>
        ) : (
          <></>
        )}
        {nextPage ? (
          <button
            className={styles.buttonChangePage}
            onClick={() => onChangePageHandler(nextPage)}
          >
            Next Page
          </button>
        ) : (
          <></>
        )}
      </div>
    );
  }
}
