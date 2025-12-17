import { createSelector } from "@reduxjs/toolkit";

const selectFilm = createSelector(
  (state) => state.film,
  (film) => film.film
);

const selectIsLoading = createSelector(
  (state) => state.film,
  (film) => film.isLoading
);

const selectError = createSelector(
  (state) => state.films,
  (film) => film.error
);


export { selectFilm, selectIsLoading, selectError };