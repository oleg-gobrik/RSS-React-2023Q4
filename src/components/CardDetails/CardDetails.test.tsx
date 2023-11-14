import { act, render, screen, waitFor } from '@testing-library/react';
import CardDetails from './CardDetails';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import userEvent from '@testing-library/user-event';
import { testMockIdPerson, testMockPerson } from '../../test/TestData';

describe('CardDetails component', () => {
  const realFetch = global.fetch;
  afterEach(() => {
    global.fetch = realFetch;
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('Should error response', async () => {
    const consoleSpy = jest.spyOn(global.console, 'log').mockImplementation();
    global.fetch = jest.fn(() => {
      return Promise.reject(new Error('Test error card details'));
    }) as jest.Mock;
    jest.spyOn(global, 'fetch');

    const { container } = render(
      <MemoryRouter initialEntries={[`/details/${testMockIdPerson}`]}>
        <Routes>
          <Route path="/details/:id" element={<CardDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(container.childElementCount).toEqual(0);
      expect(consoleSpy).toHaveBeenCalled();
    });
    consoleSpy.mockClear();
  });

  test('Should render the details of a person', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(testMockPerson),
      })
    ) as jest.Mock;
    jest.spyOn(global, 'fetch');

    act(() => {
      render(
        <MemoryRouter initialEntries={[`/details/${testMockIdPerson}`]}>
          <Routes>
            <Route path="/details/:id" element={<CardDetails />} />
          </Routes>
        </MemoryRouter>
      );
    });

    await screen.findByText(testMockPerson.name);
    expect(screen.getByText(testMockPerson.gender)).toBeInTheDocument();
    expect(screen.getByText(testMockPerson.mass)).toBeInTheDocument();
    expect(screen.getByText(testMockPerson.height)).toBeInTheDocument();
    expect(screen.getByText(testMockPerson.eye_color)).toBeInTheDocument();
    expect(screen.getByText(testMockPerson.hair_color)).toBeInTheDocument();
    expect(screen.getByText(testMockPerson.skin_color)).toBeInTheDocument();
  });

  test('Should close details after render a person data', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(testMockPerson),
      })
    ) as jest.Mock;
    jest.spyOn(global, 'fetch');

    act(() => {
      render(
        <MemoryRouter initialEntries={[`/details/${testMockIdPerson}`]}>
          <Routes>
            <Route path="/details/:id" element={<CardDetails />} />
            <Route path="/" element={<span>Empty</span>} />
          </Routes>
        </MemoryRouter>
      );
    });

    await screen.findByText(testMockPerson.name);
    expect(screen.getByText(testMockPerson.gender)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('link', { name: /close/i }));

    expect(screen.queryByText('Empty')).toBeInTheDocument();
    expect(screen.queryByText(testMockPerson.name)).not.toBeInTheDocument();
    expect(screen.queryByText(testMockPerson.gender)).not.toBeInTheDocument();
  });
});
