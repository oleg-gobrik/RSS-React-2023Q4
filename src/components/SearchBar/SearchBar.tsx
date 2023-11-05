import { useEffect, useState } from 'react';
import styles from './SearchBar.module.css';
import search from '../../assets/search.png';
import ListPreviousRequests from '../ListPreviousRequests/ListPreviousRequests';
import Button from '../Button/Button';
import {
  getSearchInputLS,
  getSearchValue,
  saveSearchInputToLS,
} from '../../utils/SearchLocalStorage';
import { Props, StateData } from './types';
import ErrorButton from '../ErrorButton/ErrorButton';
import { useNavigate } from 'react-router-dom';
import { dropdownCountCardsOnPage } from '../../utils/constParameter';
import Dropdown from '../Dropdown/Dropdown';

export default function SearchBar(props: Props) {
  const [searchBarData, setSearchBarData] = useState<StateData>({
    inputValue: '',
    resultArray: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    setSearchBarData({
      inputValue: getSearchValue(),
      resultArray: [],
    });
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
    props.setSearchValue(searchBarData.inputValue.trim());

    navigate('');

    setSearchBarData((prevState) => {
      return {
        ...prevState,
        resultArray: [],
      };
    });
  };

  return (
    <section>
      <div className={styles.searchBar}>
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
        <Button onClick={clickSearch}>
          <img className={styles.searchIcon} src={search} alt="Search" />
        </Button>
      </div>
      <Dropdown
        items={dropdownCountCardsOnPage}
        name="numberCards"
        changeValueHandler={props.setDensityValue}
      />
    </section>
  );
}
