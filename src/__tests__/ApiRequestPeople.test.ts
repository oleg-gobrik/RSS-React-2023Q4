import '@testing-library/jest-dom';
import {
  ApiResponsePeople,
  Person,
} from '../utils/ApiResponse/ApiResponsePeople';
import {
  getPeopleParamById,
  getPeopleParamBySearchAndPage,
} from '../utils/ApiRequest/ApiRequestPeople';

const testPerson: Person = {
  name: 'Darth Vader',
  eye_color: 'yellow',
  gender: 'male',
  hair_color: 'none',
  url: 'https://swapi.dev/api/people/4/',
  birth_year: '41.9BBY',
  height: '202',
  mass: '136',
  skin_color: 'white',
};
const testPeople: ApiResponsePeople = {
  count: 1,
  next: null,
  previous: null,
  results: [{ ...testPerson }],
};
const realFetch = global.fetch;
afterEach(() => {
  global.fetch = realFetch;
});

const fetchPerson = () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(testPerson),
    })
  ) as jest.Mock;
};
const fetchPeople = () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(testPeople),
    })
  ) as jest.Mock;
};

describe('ApiRequestPeople tests', () => {
  test('Returns an person getPeopleParamById', async () => {
    fetchPerson();
    jest.spyOn(global, 'fetch');
    await getPeopleParamById('4');
    expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/people/4');
  });

  test('Returns a response getPeopleParamBySearchAndPage without page', async () => {
    fetchPeople();
    jest.spyOn(global, 'fetch');
    await getPeopleParamBySearchAndPage('Vader');
    expect(global.fetch).toHaveBeenCalledWith(
      'https://swapi.dev/api/people/?search=Vader'
    );
  });

  test('Returns a response getPeopleParamBySearchAndPage with page', async () => {
    fetchPeople();
    jest.spyOn(global, 'fetch');
    await getPeopleParamBySearchAndPage('Vader', '1');
    expect(global.fetch).toHaveBeenCalledWith(
      'https://swapi.dev/api/people/?search=Vader&page=1'
    );
  });
});
