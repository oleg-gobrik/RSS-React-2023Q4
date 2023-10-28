import React from 'react';
import styles from './SearchBar.module.css';
import search from '../../assets/search.png';
import ListPreviousRequests from '../ListPreviousRequests/ListPreviousRequests';
import Button from '../Button/Button';
import { ApiResponsePeople } from '../../utils/ApiResponse/ApiResponsePeople';
import ApiRequestPeople from '../../utils/ApiRequest/ApiRequestPeople';
import SearchLocalStorage from '../../utils/SearchLocalStorage';

interface Props {
  onSearchHandler: (value: ApiResponsePeople) => void;
  loadingHandler: (value: boolean) => void;
}
interface State {
  inputValue: string;
  resultArray: string[] | undefined;
}
export default class SearchBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      inputValue: '',
      resultArray: [],
    };
  }
  componentDidMount = () => {
    const values: string[] | undefined = SearchLocalStorage.getSearchInputLS();
    if (values && values.length) {
      const value: string | undefined = values.at(-1);
      if (value !== null && value !== undefined) {
        this.setState({ inputValue: value, resultArray: [] });
        this.requestToServer(value.trim());
      }
    } else {
      this.requestToServer('');
    }
  };

  setValueToState = (value: string, requests: string[]) => {
    if (value === '') {
      this.setState({ inputValue: '', resultArray: requests });
      return;
    }
    const regExpSearch: RegExp = RegExp('^' + value + '+');
    if (requests !== null) {
      this.setState({
        inputValue: value,
        resultArray: requests.filter((item) => item.match(regExpSearch)),
      });
    } else {
      this.setState((prevState) => {
        return {
          ...prevState,
          inputValue: value,
        };
      });
    }
  };
  calculateListRequests = (value: string) => {
    const searchedInputValues: string[] | undefined =
      SearchLocalStorage.getSearchInputLS();
    searchedInputValues !== undefined
      ? this.setValueToState(value, searchedInputValues)
      : this.setState({ inputValue: value, resultArray: [] });
  };
  changeInputValueHandler = (value: string) => {
    this.calculateListRequests(value);
  };
  focusInputFieldHandler = () => {
    this.calculateListRequests(this.state.inputValue);
  };
  setValueInInput = (value: string) => {
    this.setState({ inputValue: value, resultArray: [] });
  };
  requestToServer = (value: string) => {
    const response: Promise<ApiResponsePeople> =
      ApiRequestPeople.getPeopleParamUrlAPI(value);
    response.then((result) => {
      this.props.onSearchHandler(result);
      this.props.loadingHandler(false);
    });
    this.props.loadingHandler(true);
  };
  clickSearch = () => {
    SearchLocalStorage.saveSearchInputToLS(this.state.inputValue.trim());
    this.requestToServer(this.state.inputValue.trim());
    this.setState((prevState) => {
      return {
        ...prevState,
        resultArray: [],
      };
    });
  };

  startError = () => {
    throw new Error('Error application!');
  };
  render() {
    return (
      <header className={styles.searchBar}>
        <Button clickHandler={this.startError}>
          <span className={styles.error}>Make Error</span>
        </Button>
        <div className={styles.searchInput}>
          <input
            type="text"
            value={this.state.inputValue}
            onChange={(event) => {
              this.changeInputValueHandler(event.target.value);
            }}
            onFocus={this.focusInputFieldHandler}
            onKeyDown={(event) => {
              event.key === '13' && this.clickSearch;
            }}
          />
          <ListPreviousRequests
            previousRequests={this.state.resultArray}
            onClickHandler={this.setValueInInput}
          />
        </div>
        <Button clickHandler={this.clickSearch}>
          <img className={styles.searchIcon} src={search} alt="Search" />
        </Button>
      </header>
    );
  }
}
