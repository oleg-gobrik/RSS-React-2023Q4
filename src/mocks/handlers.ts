import { HttpResponse, http } from 'msw';
import { testMockPeople, testMockPerson } from '../test/TestData';
export const handlers = [
  http.get('https://swapi.dev/api/people/:id', () => {
    return HttpResponse.json(testMockPerson);
  }),
  http.get('https://swapi.dev/api/people', () => {
    return HttpResponse.json(testMockPeople);
  }),
];
