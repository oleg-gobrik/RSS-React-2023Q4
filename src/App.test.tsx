import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('Should renders the main page', async () => {
    const { container } = render(<App />);

    expect(container.getElementsByClassName('spinnerContainer').length).toBe(1);
    await waitFor(() => {
      expect(container.getElementsByClassName('spinnerContainer').length).toBe(
        0
      );
    });
  });
});
