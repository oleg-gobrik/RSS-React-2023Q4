import { HttpResponse, delay, http } from 'msw';
import { testMockPeople, testMockPerson } from '../test/TestData';
export const handlers = [
  http.get('https://swapi.dev/api/people/:id', async ({ request, params }) => {
    console.log(request.url);
    const { id } = params;
    console.log('Fetching handler with id: ', id);
    await delay(100);
    return HttpResponse.json(testMockPerson, { status: 200 });
  }),
  http.get('https://swapi.dev/api/people/*', async ({ request }) => {
    const url = new URL(request.url);
    console.log(request.url);
    const search = url.searchParams.get('search');
    const page = url.searchParams.get('page');
    console.log(
      'Fetching handler with params: search = "',
      search,
      '" and page = "',
      page,
      '".'
    );
    await delay(150);
    return HttpResponse.json(testMockPeople, { status: 200 });
  }),
];
