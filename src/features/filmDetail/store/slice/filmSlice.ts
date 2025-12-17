import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Film } from '../../../../components/FilmCard/FilmCard.types';
import type { RootState } from '../../../../store/store';

const API_URL = 'https://www.omdbapi.com/?i=';

interface FilmState {
  film: Film | null,
  imdb: string| null,
  isLoading: boolean,
  error: string | null
}

const initialState: FilmState = {
  film: null,
  imdb: null,
  isLoading: false,
  error: null
}

const fetchFilm = async (id: string) => {
  const response = await fetch(`${API_URL}${id}&apikey=${import.meta.env.VITE_OMDB_APIKEY}`);

  if (response.ok) {
    const result = await response.json();

    return result
  } else {
    throw new Error(`Error loading film: ${response.status} - ${response.statusText}`);
  }
}

const searchFilm = createAsyncThunk(
  'film/searchFilm',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const imdb = state.film.imdb;
      let response;

      if (imdb) {
        response = await fetchFilm(imdb);
      }
      
      return response;
    } catch(error) {
      console.error(error);
    }
  });

const filmSlice = createSlice({
  name: 'film',
  initialState,
  reducers: {
    setImdb: (state, action: PayloadAction<string>) => {
      state.imdb = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(searchFilm.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(searchFilm.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(searchFilm.fulfilled, (state, action) => {
      if (!action.payload.Error) {
          state.film = action.payload ? action.payload : null;
      } else {
        state.error = action.payload.Error;
      }
      state.isLoading = false;
    })
  }
})

export { filmSlice, type FilmState, searchFilm };
export const { setImdb } = filmSlice.actions
export default filmSlice.reducer