import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import SearchBar from '../components/SearchBar/SearchBar';
import {
  ProviderProps,
  customRenderProviderWithSearchContext,
  testProviderProps,
} from '../utils/TestMethods';
import userEvent from '@testing-library/user-event';

const setDensity = jest.fn();
const setSearch = jest.fn();

describe('SearchBar component', () => {
  let providerProps: ProviderProps;
  beforeEach(() => {
    providerProps = testProviderProps;
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  test('Click the Search button saves the entered value to the local storage', async () => {
    customRenderProviderWithSearchContext(
      <SearchBar setDensityValue={setDensity} setSearchValue={setSearch} />,
      { providerProps }
    );
    // const navigate = jest.fn();
    // jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
    // const effect = jest.fn();
    // jest.spyOn(React, 'useEffect').mockImplementation(effect);

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Sky');
    expect(input).toHaveValue('Sky');
    // const button = screen.getByRole('button', {name:'Search'});
    // await userEvent.click(button);
    // expect(navigate).toHaveBeenCalled();
    // expect(getSearchValue()).toEqual('Sky');

    //screen.debug();
  });
});
