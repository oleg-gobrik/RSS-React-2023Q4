'use client';
import { useEffect, useState } from 'react';
import styles from './SearchInput.module.css';
import search from '../../assets/search.png';
import ListPreviousRequests from '../ListPreviousRequests/ListPreviousRequests';
import Button from '../Button/Button';
import {
  getSearchInputLS,
  getSearchValue,
  saveSearchInputToLS,
} from '../../utils/SearchLocalStorage';
import { StateData } from './types';
import ErrorButton from '../ErrorButton/ErrorButton';
import { useAppDispatch } from '../../store/hooks';
import { setSearchValue } from '../../store/searchSlice/searchSlice';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SearchInput() {
  const [searchInputData, setSearchInputData] = useState<StateData>({
    inputValue: '',
    resultArray: [],
  });
  const dispatch = useAppDispatch();

  const router = useRouter();
  useEffect(() => {
    setSearchInputData({
      inputValue: getSearchValue(),
      resultArray: [],
    });
  }, []);

  const setValueToState = (value: string, requests: string[]) => {
    if (value === '') {
      setSearchInputData({
        inputValue: '',
        resultArray: requests,
      });
      return;
    }
    const regExpSearch: RegExp = RegExp('^' + value + '+');
    setSearchInputData({
      inputValue: value,
      resultArray: requests.filter((item) => item.match(regExpSearch)),
    });
  };

  const calculateListRequests = (value: string) => {
    const searchedInputValues: string[] | undefined = getSearchInputLS();
    searchedInputValues
      ? setValueToState(value, searchedInputValues)
      : setSearchInputData((prevState) => ({
          ...prevState,
          inputValue: value,
          resultArray: [],
        }));
  };

  const changeInputValueHandler = (value?: string) => {
    calculateListRequests(
      value || value === '' ? value : searchInputData.inputValue
    );
  };

  const setValueInInput = (value: string) => {
    setSearchInputData((prevState) => ({
      ...prevState,
      inputValue: value,
      resultArray: [],
    }));
  };

  const clickSearch = () => {
    saveSearchInputToLS(searchInputData.inputValue.trim());
    setSearchInputData((prevState) => {
      return {
        ...prevState,
        resultArray: [],
      };
    });
    router.push('');
    dispatch(setSearchValue({ value: searchInputData.inputValue.trim() }));
  };

  return (
    <div className={styles.searchBar}>
      <ErrorButton />
      <div className={styles.searchInput}>
        <input
          type="text"
          value={searchInputData.inputValue}
          placeholder="Search"
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
          previousRequests={searchInputData.resultArray}
          onClickHandler={setValueInInput}
        />
      </div>
      <Button onClick={clickSearch} aria-label="Search">
        <Image src={search} alt="Search" width={24} />
      </Button>
    </div>
  );
}
