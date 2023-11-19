import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { routerSearchConfig } from './RouterSearch';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

describe('RouterSearch component', () => {
  const realFetch = global.fetch;
  afterEach(() => {
    global.fetch = realFetch;
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('Should render 404 Page Not Found.', async () => {
    const consoleSpy = jest.spyOn(global.console, 'warn').mockImplementation();
    global.fetch = jest.fn(() => {
      Promise.reject(new Error('Test'));
    }) as jest.Mock;
    const router = createMemoryRouter(routerSearchConfig, {
      initialEntries: ['/posts'],
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByText('404: Page Not Found')).toBeInTheDocument();
    });
    consoleSpy.mockClear();
  });
});
