import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/users/store/slice/userSlice';
import filmsReducer from '../features/search/store/slice/filmsSlice';
import filmReducer from '../features/filmDetail/store/slice/filmSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    films: filmsReducer,
    film: filmReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
