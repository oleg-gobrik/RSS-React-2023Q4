import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { ApiResponsePeople, Person } from '../ApiResponse/ApiResponsePeople';

export const searchAPI = createApi({
  reducerPath: 'searchAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/people/' }),
  endpoints: (build) => ({
    fetchPerson: build.query<Person, string>({
      query: (id) => ({
        url: `${id}`,
      }),
    }),
    fetchSearchObject: build.query<
      ApiResponsePeople,
      { searchValue: string; page?: string }
    >({
      query: ({ searchValue = '', page = '1' }) => ({
        url: '',
        params: {
          search: searchValue,
          page: page,
        },
      }),
    }),
  }),
});
