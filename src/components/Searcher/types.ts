import { ApiResponsePeople } from '../../utils/ApiResponse/ApiResponsePeople';

export type Props = {
  searchObject: ApiResponsePeople;
  isLoadingSearch: boolean;
  changeItemsHandler: (page?: number) => void;
};
