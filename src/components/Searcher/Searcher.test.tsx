import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';
import Searcher from './Searcher';
import {
  testMockPerson,
  testMockProviderProps,
  testMockProviderPropsAndDensity20,
} from '../../test/TestData';
import {
  ProviderProps,
  customRenderWithSearchContext,
} from '../../test/TestMethods';
import userEvent from '@testing-library/user-event';
import { server } from '../../mocks/server';
import { HttpResponse, http } from 'msw';

describe('Searcher component', () => {
  let providerProps: ProviderProps;

  test('Should render spinner loading and after card with name', async () => {
    providerProps = JSON.parse(JSON.stringify(testMockProviderProps));

    const { container } = customRenderWithSearchContext(<Searcher />, {
      providerProps,
    });

    expect(container.getElementsByClassName('spinnerContainer').length).toBe(1);

    await waitFor(() => screen.findByText(testMockPerson.name));
    expect(screen.getByText(testMockPerson.name)).toBeInTheDocument();
  });

  test('Should render spinner loading and after card with name with density 20', async () => {
    providerProps = JSON.parse(
      JSON.stringify(testMockProviderPropsAndDensity20)
    );

    const { container } = customRenderWithSearchContext(<Searcher />, {
      providerProps,
    });

    expect(container.getElementsByClassName('spinnerContainer').length).toBe(1);

    await waitFor(() => screen.findByText(testMockPerson.name));
    expect(screen.getByText(testMockPerson.name)).toBeInTheDocument();
  });

  test('Should render second page after click on page link', async () => {
    providerProps = JSON.parse(JSON.stringify(testMockProviderProps));

    const { container } = customRenderWithSearchContext(<Searcher />, {
      providerProps,
    });

    expect(container.getElementsByClassName('spinnerContainer').length).toBe(1);

    await waitFor(() => screen.findByText('Obi-Wan Kenobi'));
    expect(screen.getByText('Obi-Wan Kenobi')).toBeInTheDocument();

    const link = screen.getByText('2');
    userEvent.click(link);
    await waitFor(() => screen.findByText('Wat Tambor'));
    expect(screen.getByText('Wat Tambor')).toBeInTheDocument();
  });
});

describe('Searcher errors', () => {
  let providerProps: ProviderProps;

  test('Should throw error after fetch with density 10', async () => {
    providerProps = JSON.parse(JSON.stringify(testMockProviderProps));
    server.use(
      http.get(`*`, () => {
        return new HttpResponse(null, { status: 404 });
      })
    );

    customRenderWithSearchContext(<Searcher />, { providerProps });

    await waitFor(() => screen.findByText('Nothing'));
    expect(screen.getByText('Nothing')).toBeInTheDocument();
  });

  test('Should throw error after fetch with density 20', async () => {
    providerProps = JSON.parse(
      JSON.stringify(testMockProviderPropsAndDensity20)
    );
    server.use(
      http.get(`*`, () => {
        return new HttpResponse(null, { status: 404 });
      })
    );

    customRenderWithSearchContext(<Searcher />, { providerProps });

    screen.debug();
    await waitFor(() => screen.findByText('Nothing'));
    expect(screen.getByText('Nothing')).toBeInTheDocument();
  });
});
