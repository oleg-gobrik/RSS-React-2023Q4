import { ApiResponsePeople, Person } from '../ApiResponse/ApiResponsePeople';

export const getPeopleParamBySearchAndPage = async (
  search: string,
  page?: string
) => {
  const response = await fetch(
    page
      ? `https://swapi.dev/api/people/?search=${search}&page=${page}`
      : `https://swapi.dev/api/people/?search=${search}`
  );
  const result: ApiResponsePeople = await response.json();
  return result;
};

export const getPeopleParamById = async (id: string) => {
  const response = await fetch(`https://swapi.dev/api/people/${id}`);
  const result: Person = await response.json();
  return result;
};

export const getIdFromUrl = (url: string) => {
  return url.slice(0, -1).split('/').pop();
};
