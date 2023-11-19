import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  ApiResponsePeople,
  Person,
  initialPerson,
  initialResponsePeople,
} from '../../utils/ApiResponse/ApiResponsePeople';
import { PersonListState, SearchParam } from './types';

const processingResult = (result: ApiResponsePeople[]) => {
  let responses: ApiResponsePeople = initialResponsePeople;
  const allResults = result.reduce<Person[]>(
    (accumulator, item) => [...accumulator, ...(item.results || [])],
    []
  );
  responses = {
    count: result[0].count,
    results: allResults,
    previous: result[0].previous,
    next: result[0].next,
  };
  return responses;
};

export const fetchSearch = createAsyncThunk(
  'searchResult/fetchSearch',
  async (
    { search, page, originPagesCount /*, limit = 20*/ }: SearchParam,
    { rejectWithValue }
  ) => {
    try {
      //if (limit === 20) {
      const dataRequests: Promise<ApiResponsePeople>[] = [
        2 * +(page ? page : 1) - 1,
        2 * +(page ? page : 1),
      ]
        .filter((x) => x <= originPagesCount)
        .map(async (pageNumber) => {
          const response = await fetch(
            `https://swapi.dev/api/people/?search=${search}&page=${pageNumber.toString()}`
          );
          if (!response.ok) {
            throw new Error('Server error.');
          }
          const data: ApiResponsePeople = await response.json();
          return data;
        });
      const data: ApiResponsePeople = await Promise.all(dataRequests).then(
        (result) => processingResult(result)
      );
      return data;
      //}
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const initialState: PersonListState = {
  personDetails: initialPerson,
  searchResponse: initialResponsePeople,
  isLoadingPerson: false,
  isLoadingSearch: false,
  errors: {
    personDetails: '',
    searchResponse: '',
  },
};

const searchResultSlice = createSlice({
  name: 'searchResult',
  initialState,
  reducers: {
    setPerson: (state, action: PayloadAction<{ personDetails: Person }>) => {
      state.isLoadingPerson = false;
      state.personDetails = action.payload.personDetails;
    },
    setSearch: (state, action: PayloadAction<ApiResponsePeople>) => {
      state.isLoadingSearch = false;
      state.searchResponse = action.payload;
    },
    setIsLoadingSearch: (state) => {
      state.isLoadingSearch = true;
    },
    setIsLoadingPerson: (state) => {
      state.isLoadingPerson = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearch.pending, (state) => {
        state.isLoadingSearch = true;
        state.errors.searchResponse = '';
      })
      .addCase(
        fetchSearch.fulfilled,
        (state, action: PayloadAction<ApiResponsePeople>) => {
          state.isLoadingSearch = false;
          state.searchResponse = action.payload;
          state.errors.searchResponse = '';
        }
      )
      .addCase(fetchSearch.rejected, (state, action) => {
        state.isLoadingSearch = false;
        state.errors.searchResponse = (action.payload as Error).message;
      });
  },
});

export const { setPerson, setSearch, setIsLoadingPerson, setIsLoadingSearch } =
  searchResultSlice.actions;
export default searchResultSlice.reducer;
