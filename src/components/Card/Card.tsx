import styles from './Card.module.css';
import React from 'react';

type Props = {
  children: JSX.Element;
};
class Card extends React.Component<Props> {
  render() {
    return <div className={styles.card}>{this.props.children}</div>;
  }
}
export default Card;
