import { ApiResponsePeople } from '../ApiResponse/ApiResponsePeople';

export default class ApiRequestPeople {
  static getPeopleFullUrlAPI = async (
    url: string
  ): Promise<ApiResponsePeople> => {
    const response = await fetch(url);
    const result: ApiResponsePeople = await response.json();
    return result;
  };
  static getPeopleParamUrlAPI = async (
    addToUrl: string = ''
  ): Promise<ApiResponsePeople> => {
    const response = await fetch(
      `https://swapi.dev/api/people/?search=${addToUrl}`
    );
    const result: ApiResponsePeople = await response.json();
    return result;
  };
}
