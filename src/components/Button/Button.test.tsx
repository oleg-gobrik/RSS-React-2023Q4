import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
  test('Should render the Button', () => {
    render(
      <Button>
        <p>test</p>
      </Button>
    );
    const textButton = screen.getByText(/test/i);
    expect(textButton).toBeInTheDocument();
  });
  test('Should add second style  to button', () => {
    render(<Button additionalClass="secondStyle">{<p>test</p>}</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('Button secondStyle');
  });
});
