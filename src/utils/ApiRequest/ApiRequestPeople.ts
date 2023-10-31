import { ApiResponsePeople } from '../ApiResponse/ApiResponsePeople';

export const getPeopleFullUrlAPI = async (
  url: string
): Promise<ApiResponsePeople> => {
  const response = await fetch(url);
  const result: ApiResponsePeople = await response.json();
  return result;
};
export const getPeopleParamUrlAPI = async (addToUrl: string = '') => {
  const response = await fetch(
    `https://swapi.dev/api/people/?search=${addToUrl}`
  );
  const result: ApiResponsePeople = await response.json();
  return result;
};
