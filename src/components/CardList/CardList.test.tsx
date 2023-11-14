import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CardList from './CardList';
import {
  initialResponsePeople,
  ApiResponsePeople,
} from '../../utils/ApiResponse/ApiResponsePeople';
import { MemoryRouter } from 'react-router-dom';
import { testMockPeople } from '../../test/TestData';

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
        <CardList searchObject={testMockPeople} />
      </MemoryRouter>
    );
    const quantityCards = container.getElementsByClassName('card');
    if (testMockPeople.count > 10) {
      expect(quantityCards.length).toBe(10);
    } else {
      expect(quantityCards.length).toBe(testMockPeople.count);
    }
  });
});
