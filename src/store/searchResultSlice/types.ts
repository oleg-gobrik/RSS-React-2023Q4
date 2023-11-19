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
