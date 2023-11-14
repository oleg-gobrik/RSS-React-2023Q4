import { act, render, screen } from '@testing-library/react';
import CardDetails from './CardDetails';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import userEvent from '@testing-library/user-event';

describe('CardDetails component', () => {
  const mockPerson = {
    name: 'Anakin Skywalker',
    height: '188',
    mass: '84',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '41.9BBY',
    gender: 'male',
    url: 'https://swapi.dev/api/people/11/',
  };
  const mockId = '11';

  const realFetch = global.fetch;

  afterEach(() => {
    global.fetch = realFetch;
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('Should error response', async () => {
    let called: boolean = false;
    const consoleSpy = jest.spyOn(global.console, 'log').mockImplementation();
    global.fetch = jest.fn(() => {
      called = true;
      return Promise.reject(new Error('Test error card details'));
    }) as jest.Mock;
    jest.spyOn(global, 'fetch');

    act(() => {
      render(
        <MemoryRouter initialEntries={[`/details/${mockId}`]}>
          <Routes>
            <Route path="/details/:id" element={<CardDetails />} />
          </Routes>
        </MemoryRouter>
      );
    });
    expect(called).toBeTruthy();
    consoleSpy.mockClear();
  });

  test('Should render the details of a person', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockPerson),
      })
    ) as jest.Mock;
    jest.spyOn(global, 'fetch');

    act(() => {
      render(
        <MemoryRouter initialEntries={[`/details/${mockId}`]}>
          <Routes>
            <Route path="/details/:id" element={<CardDetails />} />
          </Routes>
        </MemoryRouter>
      );
    });

    await screen.findByText(mockPerson.name);
    expect(screen.getByText(mockPerson.gender)).toBeInTheDocument();
    expect(screen.getByText(mockPerson.mass)).toBeInTheDocument();
    expect(screen.getByText(mockPerson.height)).toBeInTheDocument();
    expect(screen.getByText(mockPerson.eye_color)).toBeInTheDocument();
    expect(screen.getByText(mockPerson.hair_color)).toBeInTheDocument();
    expect(screen.getByText(mockPerson.skin_color)).toBeInTheDocument();
  });

  test('Should close details after render a person data', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockPerson),
      })
    ) as jest.Mock;
    jest.spyOn(global, 'fetch');

    act(() => {
      render(
        <MemoryRouter initialEntries={[`/details/${mockId}`]}>
          <Routes>
            <Route path="/details/:id" element={<CardDetails />} />
          </Routes>
        </MemoryRouter>
      );
    });

    await screen.findByText(mockPerson.name);
    expect(screen.getByText(mockPerson.gender)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('link', { name: /close/i }));

    expect(screen.queryByText(mockPerson.name)).not.toBeInTheDocument();
    expect(screen.queryByText(mockPerson.gender)).not.toBeInTheDocument();
  });
});
