import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Film } from '../../../../components/FilmCard/FilmCard.types';
import type { RootState } from '../../../../store/store';

const API_URL = 'https://www.omdbapi.com/?s=';

interface FilmsState {
  films: Array<Film>,
  currentPage: number,
  searchQuery: string,
  totalFilms: number,
  totalPages: number,
  isLoading: boolean,
  error: string | null
}

const initialState: FilmsState = {
  films: [],
  currentPage: 1,
  searchQuery: "",
  totalFilms: 0,
  totalPages: 0,
  isLoading: false,
  error: null
}

const fetchFilm = async (term: string, page: number) => {
  const response = await fetch(`${API_URL}${term}&page=${page}&apikey=${import.meta.env.VITE_OMDB_APIKEY}`);

  if (response.ok) {
    const result = await response.json();

    return result
  }
}

const searchFilms = createAsyncThunk(
  'films/searchFilms',
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

export { filmsSlice, type FilmsState, searchFilms };
export const { cleanFilms, setPage, setSearchQuery, setTotalPages } = filmsSlice.actions
export default filmsSlice.reducer