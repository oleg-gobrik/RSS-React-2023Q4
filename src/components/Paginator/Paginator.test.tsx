import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Paginator from './Paginator';
import { MemoryRouter } from 'react-router-dom';

describe('Paginator component', () => {
  test('Should render component 4 pages', () => {
    const { container } = render(
      <MemoryRouter>
        <Paginator countPages={4} currentPage={1} />
      </MemoryRouter>
    );
    const quantityCards = container.getElementsByTagName('a');
    expect(quantityCards.length).toBe(4);
  });

  test('Should render component 15 pages', () => {
    const { container } = render(
      <MemoryRouter>
        <Paginator countPages={15} currentPage={1} />
      </MemoryRouter>
    );
    const quantityCards = container.getElementsByTagName('a');
    expect(quantityCards.length).toBe(10);
  });

  test('Should right set link to page', () => {
    render(
      <MemoryRouter>
        <Paginator countPages={5} currentPage={1} />
      </MemoryRouter>
    );

    const urlToPage = '/page/3';
    const linkToPage = screen.getByText('3');

    expect(linkToPage).toHaveAttribute('href', urlToPage);
  });

  test('Should right set link to page from page 1', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/page/1' }]}>
        <Paginator countPages={5} currentPage={1} />
      </MemoryRouter>
    );

    const urlToPage = '/page/3';
    const linkToPage = screen.getByText('3');
    expect(linkToPage).toHaveAttribute('href', urlToPage);
  });

  test('Should set by default page on first', () => {
    render(
      <MemoryRouter>
        <Paginator countPages={5} currentPage={undefined} />
      </MemoryRouter>
    );

    const firstPageLink = screen.getByText('1');
    expect(firstPageLink).toHaveClass('currentPage');
  });
});
