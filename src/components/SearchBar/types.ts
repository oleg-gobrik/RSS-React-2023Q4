export type Props = {
  setSearchValue: (value: string) => void;
  // onSearchHandler: (value: ApiResponsePeople) => void;
  // loadingHandler: (value: boolean) => void;
};
export type StateData = {
  inputValue: string;
  resultArray: string[] | undefined;
};
