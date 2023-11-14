import {
  ApiResponsePeople,
  Person,
} from '../utils/ApiResponse/ApiResponsePeople';

export const testMockIdPerson = '10';
export const testMockPerson: Person = {
  name: 'Obi-Wan Kenobi',
  height: '182',
  mass: '77',
  hair_color: 'auburn, white',
  skin_color: 'fair',
  eye_color: 'blue-gray',
  birth_year: '57BBY',
  gender: 'male',
  url: 'https://swapi.dev/api/people/10/',
};

export const testMockPeople: ApiResponsePeople = {
  count: 18,
  next: 'https://swapi.dev/api/people/?search=B&page=2',
  previous: null,
  results: [
    {
      name: 'Beru Whitesun lars',
      height: '165',
      mass: '75',
      hair_color: 'brown',
      skin_color: 'light',
      eye_color: 'blue',
      birth_year: '47BBY',
      gender: 'female',
      url: 'https://swapi.dev/api/people/7/',
    },
    {
      name: 'Biggs Darklighter',
      height: '183',
      mass: '84',
      hair_color: 'black',
      skin_color: 'light',
      eye_color: 'brown',
      birth_year: '24BBY',
      gender: 'male',
      url: 'https://swapi.dev/api/people/9/',
    },
    {
      name: 'Obi-Wan Kenobi',
      height: '182',
      mass: '77',
      hair_color: 'auburn, white',
      skin_color: 'fair',
      eye_color: 'blue-gray',
      birth_year: '57BBY',
      gender: 'male',
      url: 'https://swapi.dev/api/people/10/',
    },
    {
      name: 'Chewbacca',
      height: '228',
      mass: '112',
      hair_color: 'brown',
      skin_color: 'unknown',
      eye_color: 'blue',
      birth_year: '200BBY',
      gender: 'male',
      url: 'https://swapi.dev/api/people/13/',
    },
    {
      name: 'Jabba Desilijic Tiure',
      height: '175',
      mass: '1,358',
      hair_color: 'n/a',
      skin_color: 'green-tan, brown',
      eye_color: 'orange',
      birth_year: '600BBY',
      gender: 'hermaphrodite',
      url: 'https://swapi.dev/api/people/16/',
    },
    {
      name: 'Boba Fett',
      height: '183',
      mass: '78.2',
      hair_color: 'black',
      skin_color: 'fair',
      eye_color: 'brown',
      birth_year: '31.5BBY',
      gender: 'male',
      url: 'https://swapi.dev/api/people/22/',
    },
    {
      name: 'Bossk',
      height: '190',
      mass: '113',
      hair_color: 'none',
      skin_color: 'green',
      eye_color: 'red',
      birth_year: '53BBY',
      gender: 'male',
      url: 'https://swapi.dev/api/people/24/',
    },
    {
      name: 'Lobot',
      height: '175',
      mass: '79',
      hair_color: 'none',
      skin_color: 'light',
      eye_color: 'blue',
      birth_year: '37BBY',
      gender: 'male',
      url: 'https://swapi.dev/api/people/26/',
    },
    {
      name: 'Ackbar',
      height: '180',
      mass: '83',
      hair_color: 'none',
      skin_color: 'brown mottle',
      eye_color: 'orange',
      birth_year: '41BBY',
      gender: 'male',
      url: 'https://swapi.dev/api/people/27/',
    },
    {
      name: 'Nien Nunb',
      height: '160',
      mass: '68',
      hair_color: 'none',
      skin_color: 'grey',
      eye_color: 'black',
      birth_year: 'unknown',
      gender: 'male',
      url: 'https://swapi.dev/api/people/31/',
    },
  ],
};

export const testMockProviderProps = {
  searchValue: 'B',
  density: 10,
  searchObject: testMockPeople,
  setSearchObjectHandler: jest.fn((value: ApiResponsePeople) => {
    testMockProviderProps.searchObject = value;
  }),
};

export const testMockProviderPropsAndDensity20 = {
  searchValue: 'B',
  density: 20,
  searchObject: testMockPeople,
  setSearchObjectHandler: jest.fn((value: ApiResponsePeople) => {
    testMockProviderProps.searchObject = value;
  }),
};
