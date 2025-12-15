import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/users/store/slice/userSlice';
import filmsReducer from '../features/search/SearchBar/store/slice/filmsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    films: filmsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch