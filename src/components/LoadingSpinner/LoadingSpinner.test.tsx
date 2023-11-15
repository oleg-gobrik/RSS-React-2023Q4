import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';

describe('Loading Spinner component', () => {
  test('Render loading', () => {
    const { container } = render(<LoadingSpinner />);

    expect(container.getElementsByClassName('spinnerContainer').length).toBe(1);
    expect(container.getElementsByClassName('loadingSpinner').length).toBe(1);
  });
});
