import '@testing-library/jest-dom';
import { server } from './mocks/server';
import { cleanup } from '@testing-library/react';

beforeAll(() => {
  server.listen({
    onUnhandledRequest(request) {
      console.log('Unhandled %s %s', request.method, request.url);
    },
  });
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});
afterEach(cleanup);
