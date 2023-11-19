import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Card from './Card';
import { MemoryRouter } from 'react-router-dom';
import { testMockPerson } from '../../test/TestData';

describe('Card component', () => {
  test('Should render the card component the relevant card data', () => {
    render(
      <MemoryRouter>
        <Card value={testMockPerson} />
      </MemoryRouter>
    );
    const spanText = screen.getByText(testMockPerson.name);
    expect(spanText).toBeInTheDocument();
  });

  test('Should add link to detail is correct from home', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/' }]}>
        <Card value={testMockPerson} />
      </MemoryRouter>
    );

    const urlDetailToPerson = '/details/10';
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', urlDetailToPerson);
  });

  test('Should add link to detail is correct from page', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/page/1' }]}>
        <Card value={testMockPerson} />
      </MemoryRouter>
    );

    const urlDetailToPerson = '/page/1/details/10';
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', urlDetailToPerson);
  });

  test('Should add link to detail is correct from detail', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/details/1' }]}>
        <Card value={testMockPerson} />
      </MemoryRouter>
    );

    const urlDetailToPerson = '/details/1/../10';
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', urlDetailToPerson);
  });
});
