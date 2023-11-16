import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ErrorButton from './ErrorButton';
import React from 'react';
import userEvent from '@testing-library/user-event';

describe('ErrorButton component', () => {
  test('Should render the ErrorButton', () => {
    render(<ErrorButton />);
    const errorButton = screen.getByText(/Make error/i);
    expect(errorButton).toBeInTheDocument();
  });

  test('Should throw an error when the hasError is true', () => {
    const consoleError = jest.spyOn(console, 'error');
    consoleError.mockImplementation(() => {});

    render(<ErrorButton />);

    const setHasError = jest.fn();
    React.useState = jest.fn(() => [true, setHasError]);

    expect(() => render(<ErrorButton />)).toThrow('Test error boundary.');
  });

  test('Should change value hasError after click', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    const setHasError = jest.fn();
    React.useState = jest.fn(() => [false, setHasError]);

    render(<ErrorButton />);
    const button = screen.getByRole('button');

    await userEvent.click(button);

    expect(setHasError).toHaveBeenCalledWith(true);
  });
});
