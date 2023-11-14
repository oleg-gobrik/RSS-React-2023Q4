import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ListPreviousRequests from './ListPreviousRequests';

const data = ['Sky', 'Darth', 'Palma'];
const click = jest.fn();

describe('ListPreviousRequests component', () => {
  test('ListPreviousRequests renders with data', () => {
    render(
      <ListPreviousRequests previousRequests={data} onClickHandler={click} />
    );
    expect(screen.getByRole('list')).toBeInTheDocument();
    data.map((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });
  test('ListPreviousRequests renders with undefined', () => {
    render(
      <ListPreviousRequests
        previousRequests={undefined}
        onClickHandler={click}
      />
    );
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
});
