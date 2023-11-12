import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

describe('Loading Spinner component', () => {
  test('Render loading', () => {
    const { container } = render(<LoadingSpinner />);
    const spinner = container.getElementsByClassName('spinnerContainer');
    const loading = container.getElementsByClassName('loadingSpinner');
    expect(spinner.length).toBe(1);
    expect(loading.length).toBe(1);
  });
});
