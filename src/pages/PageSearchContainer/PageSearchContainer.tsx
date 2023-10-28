import React from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import {
  initialResponsePeople,
  ApiResponsePeople,
} from '../../utils/ApiResponse/ApiResponsePeople';
import CardListWrapper from '../../components/CardListWrapper/CardListWrapper';
import ApiRequestPeople from '../../utils/ApiRequest/ApiRequestPeople';

interface State {
  searchValue: ApiResponsePeople;
  isLoadingSearch: boolean;
}
interface Props {}

export default class PageSearchContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchValue: initialResponsePeople,
      isLoadingSearch: false,
    };
  }
  requestToSearch = (value: ApiResponsePeople) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        searchValue: value,
        isLoadingSearch: false,
      };
    });
  };
  toggleLoading = (value: boolean) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        isLoadingSearch: value,
      };
    });
  };
  getItems(url: string): void {
    const response: Promise<ApiResponsePeople> =
      ApiRequestPeople.getPeopleFullUrlAPI(url);
    response.then((result) => {
      this.setState((prevState) => {
        return {
          ...prevState,
          isLoadingSearch: false,
          searchValue: result,
        };
      });
    });
    this.setState((prevState) => {
      return {
        ...prevState,
        searchValue: initialResponsePeople,
        isLoadingSearch: true,
      };
    });
  }

  render() {
    return (
      <>
        <SearchBar
          onSearchHandler={this.requestToSearch}
          loadingHandler={this.toggleLoading}
        />
        <CardListWrapper
          searchObject={this.state.searchValue}
          isLoadingSearch={this.state.isLoadingSearch}
          changeItemsHandler={this.getItems.bind(this)}
        />
      </>
    );
  }
}
