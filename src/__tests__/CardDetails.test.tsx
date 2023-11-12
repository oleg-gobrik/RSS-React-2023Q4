import { screen } from '@testing-library/react';
import CardDetails from '../components/CardDetails/CardDetails';
import '@testing-library/jest-dom';
import {
  ProviderProps,
  customRenderProviderWithSearchContext,
  testProviderProps,
} from '../utils/TestMethods';

describe('CardDetails component', () => {
  let providerProps: ProviderProps;
  beforeEach(() => {
    providerProps = testProviderProps;
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  test('Render empty CardDetails', () => {
    customRenderProviderWithSearchContext(<CardDetails />, { providerProps });
    screen.debug();
    expect(true).toBeTruthy();
  });

  // test("Render LoadingSpinner when fetch request is processing", async () => {
  //   render(<MemoryRouter initialEntries={[{ pathname: '/details/4' }]}>
  //       <CardDetails />
  //   </MemoryRouter>);

  //   const setLoading = jest.fn();
  //   React.useState = jest.fn(() => [true, setLoading]);
  //   expect(setLoading).toHaveBeenCalledWith(true);

  //   expect(() => render(<MemoryRouter initialEntries={[{ pathname: '/details/4' }]}>
  //       <CardDetails />
  //   </MemoryRouter>)).toHaveClass('spinnerContainer');

  //   expect(true).toBeTruthy();
  // });
});
