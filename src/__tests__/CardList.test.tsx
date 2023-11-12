import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CardList from '../components/CardList/CardList';
import {
  initialResponsePeople,
  ApiResponsePeople,
} from '../utils/ApiResponse/ApiResponsePeople';
import { MemoryRouter } from 'react-router-dom';

const search: ApiResponsePeople = {
  count: 3,
  next: null,
  previous: null,
  results: [
    {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      url: 'https://swapi.dev/api/people/1/',
    },
    {
      name: 'Anakin Skywalker',
      height: '188',
      mass: '84',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '41.9BBY',
      gender: 'male',
      url: 'https://swapi.dev/api/people/11/',
    },
    {
      name: 'Shmi Skywalker',
      height: '163',
      mass: 'unknown',
      hair_color: 'black',
      skin_color: 'fair',
      eye_color: 'brown',
      birth_year: '72BBY',
      gender: 'female',
      url: 'https://swapi.dev/api/people/43/',
    },
  ],
};

describe('CardList component', () => {
  test('Render CardList with empty result', () => {
    const search: ApiResponsePeople = initialResponsePeople;
    render(<CardList searchObject={search} />);
    expect(
      screen.getByText('Nothing was found for this query.')
    ).toBeInTheDocument();
  });
  test('The component renders the specified number of cards', () => {
    const { container } = render(
      <MemoryRouter>
        <CardList searchObject={search} />
      </MemoryRouter>
    );
    const quantityCards = container.getElementsByClassName('card');
    expect(quantityCards.length).toBe(search.count);
  });
});
