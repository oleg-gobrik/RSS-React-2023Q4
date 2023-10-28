import React from 'react';
import styles from './ListPreviousRequests.module.css';

interface Props {
  previousRequests: string | string[] | undefined;
  onClickHandler: (value: string) => void;
}

class ListPreviousRequests extends React.Component<Props> {
  render() {
    const { previousRequests, onClickHandler } = this.props;
    return (
      <ul className={styles.listRequests}>
        {previousRequests !== undefined && Array.isArray(previousRequests)
          ? previousRequests.map((item, index) => (
              <li
                key={index}
                id={String(index)}
                onClick={() => onClickHandler(item)}
              >
                {item}
              </li>
            ))
          : previousRequests !== undefined && (
              <li onClick={() => onClickHandler(previousRequests)}>
                {previousRequests}
              </li>
            )}
      </ul>
    );
  }
}
export default ListPreviousRequests;
