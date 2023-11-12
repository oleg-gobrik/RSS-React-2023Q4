import React, { ErrorInfo } from 'react';
import styles from './ErrorBoundary.module.css';
import { Props, State } from './types';
export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error: ', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <h1 className={styles.error}>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
