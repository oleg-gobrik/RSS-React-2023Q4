import React from 'react';
import styles from './Button.module.css';

type Props = {
  clickHandler: () => void;
  children?: JSX.Element;
};

class Button extends React.Component<Props> {
  render() {
    return (
      <button
        onClick={() => this.props.clickHandler()}
        className={styles.Button}
      >
        {this.props.children}
      </button>
    );
  }
}
export default Button;
