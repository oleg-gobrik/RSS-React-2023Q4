import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Paginator from '../components/Paginator/Paginator';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('Paginator component', () => {
  test('Paginator renders 4 pages', () => {
    const { container } = render(
      <MemoryRouter>
        <Paginator countPages={4} currentPage={1} />
      </MemoryRouter>
    );
    const quantityCards = container.getElementsByTagName('a');
    expect(quantityCards.length).toBe(4);
  });

  test('Paginator renders 15 pages', () => {
    const { container } = render(
      <MemoryRouter>
        <Paginator countPages={15} currentPage={1} />
      </MemoryRouter>
    );
    const quantityCards = container.getElementsByTagName('a');
    expect(quantityCards.length).toBe(10);
  });

  test('Link correct', () => {
    render(
      <MemoryRouter>
        <Paginator countPages={5} currentPage={1} />
      </MemoryRouter>
    );

    const urlToPage = '/page/3';
    const linkToPage = screen.getByText('3');

    expect(linkToPage).toHaveAttribute('href', urlToPage);
  });

  test('Link correct from page 1', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/page/1' }]}>
        <Paginator countPages={5} currentPage={1} />
      </MemoryRouter>
    );

    const urlToPage = '/page/3';
    const linkToPage = screen.getByText('3');
    expect(linkToPage).toHaveAttribute('href', urlToPage);
  });

  test('Current page default on first page', () => {
    render(
      <MemoryRouter>
        <Paginator countPages={5} currentPage={undefined} />
      </MemoryRouter>
    );

    const firstPageLink = screen.getByText('1');
    expect(firstPageLink).toHaveClass('currentPage');
  });
});
