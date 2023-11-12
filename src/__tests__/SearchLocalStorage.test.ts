import '@testing-library/jest-dom';
import {
  getSearchInputLS,
  getSearchValue,
  saveSearchInputToLS,
} from '../utils/SearchLocalStorage';

describe('Search Local storage tests: getSearchInputLS', () => {
  test('Return null if localStorage is empty', () => {
    localStorage.clear();
    expect(getSearchInputLS()).toBeUndefined();
  });

  test('Return an array of strings if localStorage has data', () => {
    const mockData = ['Sky', 'Darth'];
    localStorage.setItem('searchInput', JSON.stringify(mockData));
    expect(getSearchInputLS()).toEqual(mockData);
  });
});
describe('Search Local storage tests: getSearchValue', () => {
  it('Empty string when localStorage is empty', () => {
    localStorage.clear();
    expect(getSearchValue()).toEqual('');
  });

  it('Get the last search value when localStorage is not empty', () => {
    const searchInput = ['Sky', 'Darth', 'Fet'];
    localStorage.setItem('searchInput', JSON.stringify(searchInput));
    expect(getSearchValue()).toEqual('Fet');
  });
});

describe('Search Local storage tests: saveSearchInputToLS', () => {
  it('Save value to empty localStorage', () => {
    localStorage.clear();
    saveSearchInputToLS('Darth');
    expect(localStorage.getItem('searchInput')).toEqual(
      JSON.stringify(['Darth'])
    );
  });

  it('Add value to localStorage', () => {
    const searchInput = ['Darth'];
    localStorage.setItem('searchInput', JSON.stringify(searchInput));
    saveSearchInputToLS('Sky');
    expect(localStorage.getItem('searchInput')).toEqual(
      JSON.stringify(['Darth', 'Sky'])
    );
  });

  it('Replace the last search element from localStorage', () => {
    const searchInput = ['Darth', 'Sky'];
    localStorage.setItem('searchInput', JSON.stringify(searchInput));
    saveSearchInputToLS('Darth');
    expect(localStorage.getItem('searchInput')).toEqual(
      JSON.stringify(['Sky', 'Darth'])
    );
  });
});
