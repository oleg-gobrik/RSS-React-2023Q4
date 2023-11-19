import '@testing-library/jest-dom';
import {
  getSearchInputLS,
  getSearchValue,
  saveSearchInputToLS,
} from './SearchLocalStorage';

describe('Search Local storage tests', () => {
  test('Should return null if localStorage is empty', () => {
    localStorage.clear();
    expect(getSearchInputLS()).toBeUndefined();
  });

  test('Should return an array of strings if localStorage has data', () => {
    const mockData = ['Sky', 'Darth'];
    localStorage.setItem('searchInput', JSON.stringify(mockData));
    expect(getSearchInputLS()).toEqual(mockData);
  });

  test('Should return empty string when localStorage is empty', () => {
    localStorage.clear();
    expect(getSearchValue()).toEqual('');
  });

  test('Should get the last search value when localStorage is not empty', () => {
    const searchInput = ['Sky', 'Darth', 'Fet'];
    localStorage.setItem('searchInput', JSON.stringify(searchInput));
    expect(getSearchValue()).toEqual('Fet');
  });

  test('Should save value to empty localStorage', () => {
    localStorage.clear();
    saveSearchInputToLS('Darth');
    expect(localStorage.getItem('searchInput')).toEqual(
      JSON.stringify(['Darth'])
    );
  });

  test('Should add value to localStorage', () => {
    const searchInput = ['Darth'];
    localStorage.setItem('searchInput', JSON.stringify(searchInput));
    saveSearchInputToLS('Sky');
    expect(localStorage.getItem('searchInput')).toEqual(
      JSON.stringify(['Darth', 'Sky'])
    );
  });

  test('Should replace the last search element from localStorage', () => {
    const searchInput = ['Darth', 'Sky'];
    localStorage.setItem('searchInput', JSON.stringify(searchInput));
    saveSearchInputToLS('Darth');
    expect(localStorage.getItem('searchInput')).toEqual(
      JSON.stringify(['Sky', 'Darth'])
    );
  });
});
