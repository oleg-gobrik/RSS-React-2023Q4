import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import SearchBar from './SearchBar';
import { testMockProviderProps } from '../../test/TestData';
import {
  ProviderProps,
  customRenderWithSearchContext,
} from '../../test/TestMethods';
import userEvent from '@testing-library/user-event';
import { getSearchValue } from '../../utils/SearchLocalStorage';

const setDensity = jest.fn();

describe('SearchBar component', () => {
  let providerProps: ProviderProps;

  beforeEach(() => {
    providerProps = JSON.parse(JSON.stringify(testMockProviderProps));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should render SearchBar and save entered value to the local storage after click the Search button', async () => {
    customRenderWithSearchContext(<SearchBar setDensityValue={setDensity} />, {
      providerProps,
    });

    const input = screen.getByRole('textbox');

    await userEvent.type(input, 'Sky');
    expect(input).toHaveValue('Sky');

    const button = screen.getByRole('button', { name: 'Search' });

    await userEvent.click(button);
    expect(getSearchValue()).toEqual('Sky');
  });

  test('Should render SearchBar and retrieves the value from the local storage', () => {
    customRenderWithSearchContext(<SearchBar setDensityValue={setDensity} />, {
      providerProps,
    });

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('Sky');
  });

  test('Should render SearchBar and remove previous value and entered new value with click Enter key', async () => {
    customRenderWithSearchContext(<SearchBar setDensityValue={setDensity} />, {
      providerProps,
    });

    const input = screen.getByRole('textbox');
    await userEvent.clear(input);
    expect(input).toHaveValue('');

    await userEvent.type(input, 'Vader{Enter}');
    expect(input).toHaveValue('Vader');
    expect(getSearchValue()).toEqual('Vader');
  });

  test('Should render SearchBar and set value from list previous request', async () => {
    customRenderWithSearchContext(<SearchBar setDensityValue={setDensity} />, {
      providerProps,
    });

    const input = screen.getByRole('textbox');
    await userEvent.clear(input);
    expect(input).toHaveValue('');

    await userEvent.click(screen.getByText('Sky'));
    expect(input).toHaveValue('Sky');
  });

  test('Should render SearchBar and change dropdown value with reloading page', async () => {
    customRenderWithSearchContext(
      <SearchBar setDensityValue={setDensity} />,
      { providerProps },
      '/',
      '/',
      '/page/1'
    );

    await userEvent.selectOptions(screen.getByRole('combobox'), ['20']);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
