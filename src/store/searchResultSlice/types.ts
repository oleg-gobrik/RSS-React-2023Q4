import {
  ApiResponsePeople,
  Person,
} from '../../utils/ApiResponse/ApiResponsePeople';

export interface PersonListState {
  personDetails: Person;
  searchResponse: ApiResponsePeople;
  isLoadingPerson: boolean;
  isLoadingSearch: boolean;
  errors: {
    personDetails: string;
    searchResponse: string;
  };
}
export interface SearchParam {
  search: string;
  page: string | undefined;
  originPagesCount: number;
  //limit: 10 | 20;
}
