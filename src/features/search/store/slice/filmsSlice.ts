import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../../../store/store';
import { searchFilm } from '../../../../helpers/fetch';
import { initialState } from './state.types';

const API_URL = 'https://www.omdbapi.com/?s=';

const searchFilms = createAsyncThunk(
  'films/searchFilms',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const searchQuery = state.films.searchQuery;
    const type = state.films.typeQuery.replace('any', '');
    const response = await searchFilm(API_URL, searchQuery, type, state.films.currentPage);

    return response;
  });

const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    cleanFilms: (state) => {
        state.films = [];
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    setQueryType: (state, action: PayloadAction<string>) => {
      state.typeQuery = action.payload;
    }, 
  },
  extraReducers: (builder) => {
    builder.addCase(searchFilms.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(searchFilms.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.error)
      state.error = action.error.message ? action.error.message : "Unknown Error";
    })
    .addCase(searchFilms.fulfilled, (state, action) => {
      if (!action.payload.Error) {
        if (state.currentPage === 1) {
          state.films = action.payload.Search ? [...action.payload.Search] : [];
          state.totalFilms = Number(action.payload.totalResults);
        } else {
          state.films = action.payload.Search ? 
            [...state.films, ...action.payload.Search] : [...state.films];
        }
      } else {
        state.error = action.payload.Error;
      }
      state.isLoading = false;
    })
  }
})

export { filmsSlice, searchFilms };
export const { cleanFilms, setPage, setSearchQuery, setTotalPages, setQueryType } = filmsSlice.actions
export default filmsSlice.reducer