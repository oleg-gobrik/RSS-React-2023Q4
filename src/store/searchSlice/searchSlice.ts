import { createSlice } from '@reduxjs/toolkit';
import { getSearchValue } from '../../utils/SearchLocalStorage';
import { SearchState } from './types';
import { PayloadAction } from '@reduxjs/toolkit';

const initialState: SearchState = {
  searchValue: getSearchValue(),
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<{ value: string }>) => {
      state.searchValue = action.payload.value;
    },
  },
});

export const { setSearchValue } = searchSlice.actions;
export default searchSlice.reducer;
