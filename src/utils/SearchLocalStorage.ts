const keyLocalStorageSearchInput: string = 'searchInput';

export default class SearchLocalStorage {
  static getSearchInputLS = () => {
    const fullStringLS: string | null = localStorage.getItem(
      keyLocalStorageSearchInput
    );
    if (fullStringLS) {
      const stringArrayLS: string[] = JSON.parse(fullStringLS);
      return stringArrayLS;
    }
  };
  static saveSearchInputToLS = (searchValue: string) => {
    const fullString: string | null = localStorage.getItem(
      keyLocalStorageSearchInput
    );
    if (fullString === null) {
      localStorage.setItem(
        keyLocalStorageSearchInput,
        JSON.stringify([searchValue])
      );
      return;
    }
    const searched: string[] = JSON.parse(fullString);
    if (searched.includes(searchValue)) {
      const searchFIlteredArray: string[] = searched.filter(
        (item) => item !== searchValue
      );
      localStorage.setItem(
        keyLocalStorageSearchInput,
        JSON.stringify([...searchFIlteredArray, searchValue])
      );
    } else {
      localStorage.setItem(
        keyLocalStorageSearchInput,
        JSON.stringify([...searched, searchValue])
      );
    }
  };
}
