import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Card from './Card';
import { Person } from '../../utils/ApiResponse/ApiResponsePeople';
import { MemoryRouter } from 'react-router-dom';

const testPerson: Person = {
  name: 'Darth Vader',
  eye_color: 'yellow',
  gender: 'male',
  hair_color: 'none',
  url: 'https://swapi.dev/api/people/4/',
  birth_year: '41.9BBY',
  height: '202',
  mass: '136',
  skin_color: 'white',
};

describe('Card component', () => {
  test('The card component renders the relevant card data', () => {
    render(
      <MemoryRouter>
        <Card value={testPerson} />
      </MemoryRouter>
    );
    const spanText = screen.getByText(testPerson.name);
    expect(spanText).toBeInTheDocument();
  });

  test('Link Card to detail is correct from home', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/' }]}>
        <Card value={testPerson} />
      </MemoryRouter>
    );

    const urlDetailToPerson = '/details/4';
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', urlDetailToPerson);
  });

  test('Link Card to detail is correct from page', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/page/1' }]}>
        <Card value={testPerson} />
      </MemoryRouter>
    );

    const urlDetailToPerson = '/page/1/details/4';
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', urlDetailToPerson);
  });

  test('Link Card to detail is correct from detail', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/details/1' }]}>
        <Card value={testPerson} />
      </MemoryRouter>
    );

    const urlDetailToPerson = '/details/1/../4';
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', urlDetailToPerson);
  });
});
