import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { routerSearchConfig } from '../routes/RouterSearch';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

describe('RouterSearch component', () => {
  test('RouterSearch renders 404 Page Not Found.', async () => {
    const router = createMemoryRouter(routerSearchConfig, {
      initialEntries: ['/posts'],
    });
    render(<RouterProvider router={router} />);
    expect(screen.getByText('404: Page Not Found')).toBeInTheDocument();
  });
  test('RouterSearch renders with spinner', async () => {
    const router = createMemoryRouter(routerSearchConfig);
    render(<RouterProvider router={router} />);
    screen.debug();
  });
});
