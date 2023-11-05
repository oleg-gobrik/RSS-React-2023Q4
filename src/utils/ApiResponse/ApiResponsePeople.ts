export interface ApiResponsePeople {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[] | null;
}
export const initialResponsePeople: ApiResponsePeople = {
  count: 0,
  next: null,
  previous: null,
  results: null,
};
export interface Person {
  name: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  url: string;
  birth_year: string;
  height: string;
  mass: string;
  skin_color: string;
}
export const initialPerson: Person = {
  name: '',
  eye_color: '',
  gender: '',
  hair_color: '',
  url: '',
  birth_year: '',
  height: '',
  mass: '',
  skin_color: '',
};
