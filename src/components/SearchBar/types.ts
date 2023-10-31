import { ApiResponsePeople } from '../../utils/ApiResponse/ApiResponsePeople';

export type Props = {
  onSearchHandler: (value: ApiResponsePeople) => void;
  loadingHandler: (value: boolean) => void;
};
export type StateData = {
  inputValue: string;
  resultArray: string[] | undefined;
};
