import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { routerSearchConfig } from './RouterSearch';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
//import { testMockPerson } from '../test/TestData';

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
    const { container } = render(<RouterProvider router={router} />);
    expect(container.getElementsByClassName('spinnerContainer').length).toBe(1);
  });

  test('Should renders spinner loading and after card with name with density 20', async () => {
    const router = createMemoryRouter(routerSearchConfig);
    const { container } = render(<RouterProvider router={router} />);

    expect(container.getElementsByClassName('spinnerContainer').length).toBe(1);

    //await screen.findByText(testMockPerson.name);
    screen.debug();
    // const quantityCards = container.getElementsByClassName('card');
    // expect(quantityCards.length).toEqual(testMockPeople.count)
    // expect(screen.getByText(testMockPerson.name)).toBeInTheDocument();
  });
});
