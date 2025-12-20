import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../../../store/store';
import { fetchFilm } from '../../../../helpers/fetch';
import { initialState } from './state.types';

const API_URL = 'https://www.omdbapi.com/?i=';

const searchFilm = createAsyncThunk(
  'film/searchFilm',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    try {
      const imdb = state.film.imdb;
      let response;

      if (imdb) {
        response = await fetchFilm(API_URL, imdb);
      }
      
      return response;
    } catch(error) {
      state.films.error = (error instanceof Error) ? error.message : "Unknown Error";
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
        console.log("set de error")
      }
      state.isLoading = false;
    })
  }
})

export { filmSlice, searchFilm };
export const { setImdb } = filmSlice.actions
export default filmSlice.reducer