import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import {
  ApiResponsePeople,
  Person,
} from '../utils/ApiResponse/ApiResponsePeople';
import { HYDRATE } from 'next-redux-wrapper';

export const searchAPI = createApi({
  reducerPath: 'searchAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/people/' }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
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

export const {
  util: { getRunningQueriesThunk },
} = searchAPI;

export const { fetchPerson, fetchSearchObject } = searchAPI.endpoints;
