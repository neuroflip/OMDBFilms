import { createAsyncThunk, createSlice, type AsyncThunkConfig, type GetThunkAPI, type PayloadAction } from '@reduxjs/toolkit';
import type { Film } from '../../../../filmListing/Card/Cart.types';
import type { RootState } from '../../../../../store/store';

const API_URL = 'https://www.omdbapi.com/?s=';

interface FilmsState {
  films: Array<Film>,
  currentPage: number,
  searchQuery: string,
  totalFilms: number
}

const initialState: FilmsState = {
  films: [],
  currentPage: 1,
  searchQuery: "",
  totalFilms: 0
}

const fetchFilm = async (term: string, page: number) => {
  const response = await fetch(`${API_URL}${term}&page=${page}&apikey=${import.meta.env.VITE_OMDB_APIKEY}`);

  if (response.ok) {
    const result = await response.json();

    return result
  }
}

const searchFilms = createAsyncThunk(
  'films/searchFilm',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const searchQuery = state.films.searchQuery;
      const response = await fetchFilm(searchQuery, state.films.currentPage);
      
      return response;
    } catch(error) {
      console.error(error);
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
    }
  },
  extraReducers: (builder) => {
    builder.addCase(searchFilms.fulfilled, (state, action) => {
      state.films = action.payload.Search ? [...action.payload.Search] : [];
      state.totalFilms = Number(action.payload.totalResults);
    })
  }
})

export { filmsSlice, type FilmsState, searchFilms };
export const { cleanFilms, setPage, setSearchQuery } = filmsSlice.actions
export default filmsSlice.reducer