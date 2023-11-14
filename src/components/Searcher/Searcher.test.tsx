import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import Searcher from './Searcher';
import {
  testMockPeople,
  testMockPerson,
  testMockProviderProps,
  testMockProviderPropsAndDensity20,
} from '../../test/TestData';
import {
  ProviderProps,
  customRenderWithSearchContext,
} from '../../test/TestMethods';

describe('Searcher component', () => {
  let providerProps: ProviderProps;
  const realFetch = global.fetch;
  afterEach(() => {
    global.fetch = realFetch;
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('Should renders spinner loading and after card with name', async () => {
    providerProps = testMockProviderProps;
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(testMockPeople),
      })
    ) as jest.Mock;
    const { container } = customRenderWithSearchContext(<Searcher />, {
      providerProps,
    });

    expect(container.getElementsByClassName('spinnerContainer').length).toBe(1);

    await screen.findByText(testMockPerson.name);
    expect(screen.getByText(testMockPerson.name)).toBeInTheDocument();
  });

  test('Should renders spinner loading and after card with name with density 20', async () => {
    providerProps = testMockProviderPropsAndDensity20;
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(testMockPeople),
      })
    ) as jest.Mock;
    const { container } = customRenderWithSearchContext(<Searcher />, {
      providerProps,
    });

    expect(container.getElementsByClassName('spinnerContainer').length).toBe(1);

    await screen.findByText(testMockPerson.name);
    expect(screen.getByText(testMockPerson.name)).toBeInTheDocument();
  });

  test('Should throw error after fetch with density 10', async () => {
    providerProps = testMockProviderProps;
    const consoleSpy = jest.spyOn(global.console, 'log').mockImplementation();
    global.fetch = jest.fn(() => {
      return Promise.reject(new Error('Test'));
    }) as jest.Mock;
    jest.spyOn(global, 'fetch');

    customRenderWithSearchContext(<Searcher />, { providerProps });

    await screen.findByText('1');
    expect(consoleSpy).toHaveBeenCalledWith('Test');
    consoleSpy.mockClear();
  });

  test('Should throw error after fetch with density 20', async () => {
    providerProps = testMockProviderPropsAndDensity20;
    const consoleSpy = jest.spyOn(global.console, 'log').mockImplementation();
    global.fetch = jest.fn(() => {
      return Promise.reject(new Error('Test'));
    }) as jest.Mock;
    jest.spyOn(global, 'fetch');

    customRenderWithSearchContext(<Searcher />, { providerProps });

    await screen.findByText('1');
    expect(consoleSpy).toHaveBeenCalledWith('Test');
    consoleSpy.mockClear();
  });
});
