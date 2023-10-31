import { useEffect, useState } from 'react';
import styles from './SearchBar.module.css';
import search from '../../assets/search.png';
import ListPreviousRequests from '../ListPreviousRequests/ListPreviousRequests';
import Button from '../Button/Button';
import { ApiResponsePeople } from '../../utils/ApiResponse/ApiResponsePeople';
import { getPeopleParamUrlAPI } from '../../utils/ApiRequest/ApiRequestPeople';
import {
  getSearchInputLS,
  saveSearchInputToLS,
} from '../../utils/SearchLocalStorage';
import { Props, StateData } from './types';
import ErrorButton from '../ErrorButton/ErrorButton';

export default function SearchBar(props: Props) {
  const [searchBarData, setSearchBarData] = useState<StateData>({
    inputValue: '',
    resultArray: [],
  });

  const requestToServer = async (value: string) => {
    props.loadingHandler(true);
    const result: ApiResponsePeople = await getPeopleParamUrlAPI(value);
    props.onSearchHandler(result);
    props.loadingHandler(false);
  };

  useEffect(() => {
    const values: string[] | undefined = getSearchInputLS();
    if (values && values.length) {
      const value: string | undefined = values.at(-1);
      if (value !== null && value !== undefined) {
        setSearchBarData({
          inputValue: value,
          resultArray: [],
        });
        //requestToServer(value.trim());
      }
    } else {
      //requestToServer('');
    }
  }, []);

  const setValueToState = (value: string, requests: string[]) => {
    if (value === '') {
      setSearchBarData({
        inputValue: '',
        resultArray: requests,
      });
      return;
    }
    const regExpSearch: RegExp = RegExp('^' + value + '+');
    setSearchBarData({
      inputValue: value,
      resultArray: requests.filter((item) => item.match(regExpSearch)),
    });
  };

  const calculateListRequests = (value: string) => {
    const searchedInputValues: string[] | undefined = getSearchInputLS();
    searchedInputValues
      ? setValueToState(value, searchedInputValues)
      : setSearchBarData((prevState) => ({
          ...prevState,
          inputValue: value,
          resultArray: [],
        }));
  };
  const changeInputValueHandler = (value?: string) => {
    calculateListRequests(
      value || value === '' ? value : searchBarData.inputValue
    );
  };
  const setValueInInput = (value: string) => {
    setSearchBarData((prevState) => ({
      ...prevState,
      inputValue: value,
      resultArray: [],
    }));
  };

  const clickSearch = () => {
    saveSearchInputToLS(searchBarData.inputValue.trim());
    requestToServer(searchBarData.inputValue.trim());
    setSearchBarData((prevState) => {
      return {
        ...prevState,
        resultArray: [],
      };
    });
  };
  return (
    <header className={styles.searchBar}>
      <ErrorButton />
      <div className={styles.searchInput}>
        <input
          type="text"
          value={searchBarData.inputValue}
          onChange={(event) => {
            changeInputValueHandler(event.target.value);
          }}
          onFocus={() => {
            changeInputValueHandler();
          }}
          onKeyDown={(event) => {
            event.key === 'Enter' && clickSearch();
          }}
        />
        <ListPreviousRequests
          previousRequests={searchBarData.resultArray}
          onClickHandler={setValueInInput}
        />
      </div>
      <Button clickHandler={clickSearch}>
        <img className={styles.searchIcon} src={search} alt="Search" />
      </Button>
    </header>
  );
}
