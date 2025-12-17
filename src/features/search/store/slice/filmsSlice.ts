import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../../../store/store';
import { fetchFilm } from '../../../../dbConfig/fetch';
import { initialState } from './state.types';

const API_URL = 'https://www.omdbapi.com/?s=';

const searchFilms = createAsyncThunk(
  'films/searchFilms',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    try {
      const searchQuery = state.films.searchQuery;
      const response = await fetchFilm(API_URL, searchQuery, state.films.currentPage);
      
      return response;
    } catch(error) {
      state.films.error = (error instanceof Error) ? error.message : "Unknown Error";
    }
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
    }
  },
  extraReducers: (builder) => {
    builder.addCase(searchFilms.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(searchFilms.rejected, (state) => {
      state.isLoading = false;
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
export const { cleanFilms, setPage, setSearchQuery, setTotalPages } = filmsSlice.actions
export default filmsSlice.reducer