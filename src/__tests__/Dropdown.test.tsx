import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Dropdown from '../components/Dropdown/Dropdown';
import { dropdownCountCardsOnPage } from '../utils/constants';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router-dom';

const mockedOptions = [10, 20];

describe('Dropdown component', () => {
  test('Render dropdown', () => {
    const changeDropdownValue = jest.fn();
    render(
      <Dropdown
        name="numberCards"
        items={dropdownCountCardsOnPage}
        changeValueHandler={changeDropdownValue}
      />
    );
    expect((screen.getByText('10') as HTMLOptionElement).selected).toBeTruthy();
    expect((screen.getByText('20') as HTMLOptionElement).selected).toBeFalsy();
  });
  test('Change value dropdown', async () => {
    const changeDropdownValue = jest.fn();
    const user = userEvent.setup();

    render(
      <Dropdown
        name="numberCards"
        items={mockedOptions}
        changeValueHandler={changeDropdownValue}
      />
    );
    await user.selectOptions(screen.getByRole('combobox'), '20');

    expect(
      (screen.getByRole('option', { name: '20' }) as HTMLOptionElement).selected
    ).toBe(true);
    expect(
      (screen.getByRole('option', { name: '10' }) as HTMLOptionElement).selected
    ).toBe(false);
  });
});
