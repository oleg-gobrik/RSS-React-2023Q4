import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Dropdown from './Dropdown';
import { dropdownCountCardsOnPage } from '../../utils/constants';
import userEvent from '@testing-library/user-event';

const mockedOptions = [10, 20];

describe('Dropdown component', () => {
  test('Should render dropdown', () => {
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
  test('Should change value dropdown', async () => {
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
