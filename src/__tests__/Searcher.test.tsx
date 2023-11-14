import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import Searcher from '../components/Searcher/Searcher';
import {
  ProviderProps,
  customRenderWithSearchContext,
  testMockPeople,
  testMockProviderProps,
} from '../utils/TestMethods';

describe('Searcher component', () => {
  let providerProps: ProviderProps;
  beforeEach(() => {
    providerProps = testMockProviderProps;
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(testMockPeople),
      })
    ) as jest.Mock;
    jest.spyOn(global, 'fetch');
  });

  const realFetch = global.fetch;
  afterEach(() => {
    global.fetch = realFetch;
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('Searcher renders', () => {
    customRenderWithSearchContext(<Searcher />, { providerProps });
    screen.debug();
    //expect(true).toBeTruthy();
  });
});
