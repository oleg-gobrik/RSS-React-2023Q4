const keyLocalStorageSearchInput: string = 'searchInput';

export const getSearchInputLS = () => {
  if (typeof window !== 'undefined') {
    const fullStringLS: string | null = localStorage.getItem(
      keyLocalStorageSearchInput
    );
    if (fullStringLS) {
      const stringArrayLS: string[] = JSON.parse(fullStringLS);
      return stringArrayLS;
    }
  }
};
export const saveSearchInputToLS = (searchValue: string) => {
  if (typeof window !== 'undefined') {
    const fullString: string | null = localStorage.getItem(
      keyLocalStorageSearchInput
    );
    if (!fullString) {
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
  }
};
export const getSearchValue = () => {
  if (typeof window !== 'undefined') {
    const values: string[] | undefined = getSearchInputLS();
    if (values && values.length) {
      const value: string | undefined = values.at(-1);
      if (value !== null && value !== undefined) {
        return value;
      }
    }
  }
  return '';
};
