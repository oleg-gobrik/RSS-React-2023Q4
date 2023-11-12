import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ErrorButton from '../components/ErrorButton/ErrorButton';
import React from 'react';

describe('ErrorButton component', () => {
  test('Render the ErrorButton', () => {
    render(<ErrorButton />);
    const errorButton = screen.getByText(/Make error/i);
    expect(errorButton).toBeInTheDocument();
  });

  test('ErrorButton throw an error when the hasError is true', () => {
    const consoleError = jest.spyOn(console, 'error');
    consoleError.mockImplementation(() => {});

    render(<ErrorButton />);

    const setHasError = jest.fn();
    React.useState = jest.fn(() => [true, setHasError]);

    expect(() => render(<ErrorButton />)).toThrow('Test error boundary.');
  });

  // test("ErrorButton click change value hasError", () => {

  //   const setHasError = jest.fn();
  //   const useStateMock = () => [false, setHasError];

  //   //@ts-ignore
  //   jest.spyOn(React, 'useState').mockImplementation(useStateMock);

  //   render(<ErrorButton />);
  //   const button = screen.getByRole('button');

  //   // screen.debug();
  //   userEvent.click(button);

  //   expect(setHasError).toHaveBeenCalledWith(true);
  // });
});
