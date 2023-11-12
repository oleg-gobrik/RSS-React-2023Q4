import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import Searcher from '../components/Searcher/Searcher';

import {
  ProviderProps,
  customRenderProviderWithSearchContext,
  testProviderProps,
} from '../utils/TestMethods';

describe('Searcher component', () => {
  let providerProps: ProviderProps;
  beforeEach(() => {
    providerProps = testProviderProps;
  });

  test('Searcher renders', () => {
    customRenderProviderWithSearchContext(<Searcher />, { providerProps });
    expect(true).toBeTruthy();
  });
});
