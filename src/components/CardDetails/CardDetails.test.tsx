import { screen, waitFor } from '@testing-library/react';
import CardDetails from './CardDetails';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { testMockIdPerson, testMockPerson } from '../../test/TestData';
import { customRender } from '../../test/TestMethods';
import { server } from '../../mocks/server';
import { HttpResponse, http } from 'msw';

describe('CardDetails component', () => {
  test('Should render the details of a person', async () => {
    server.use(
      http.get(`*`, () => {
        return HttpResponse.json(testMockPerson);
      })
    );
    customRender(
      <CardDetails />,
      `/details/${testMockIdPerson}`,
      '/details/:id'
    );

    await waitFor(() => screen.findByText(testMockPerson.name));
    expect(screen.getByText(testMockPerson.gender)).toBeInTheDocument();
  });

  test('Should close details after render a person data', async () => {
    server.use(
      http.get(`*`, () => {
        return HttpResponse.json(testMockPerson);
      })
    );
    customRender(
      <CardDetails />,
      `/details/${testMockIdPerson}`,
      '/details/:id',
      '/'
    );

    await waitFor(() => screen.findByText(testMockPerson.name));
    expect(screen.getByText(testMockPerson.gender)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('link', { name: /close/i }));

    expect(screen.queryByText('Test')).toBeInTheDocument();
    expect(screen.queryByText(testMockPerson.name)).not.toBeInTheDocument();
    expect(screen.queryByText(testMockPerson.gender)).not.toBeInTheDocument();
  });
});
