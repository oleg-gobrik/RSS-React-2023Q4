import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import App from './App';
import { testMockPeople } from './test/TestData';

describe('App', () => {
  const realFetch = global.fetch;
  afterEach(() => {
    global.fetch = realFetch;
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('Renders the main page', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(testMockPeople),
      })
    ) as jest.Mock;
    const { container } = render(<App />);

    expect(container.getElementsByClassName('spinnerContainer').length).toBe(1);
    await waitFor(() => {
      expect(container.getElementsByClassName('spinnerContainer').length).toBe(
        0
      );
    });
  });
});
