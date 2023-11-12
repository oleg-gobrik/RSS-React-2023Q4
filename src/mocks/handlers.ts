import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get(`https://swapi.dev/api/people/4`, ({ request }) => {
    console.log('Captured a "GET /posts" request');
    console.log('Just observing:', request.method, request.url);
    return HttpResponse.json(request);
  }),
];
