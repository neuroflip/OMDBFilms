import { createSelector } from "@reduxjs/toolkit";

const selectFilms = createSelector(
  (state) => state.films,
  (films) => films.films
);

const selectTotalFilms = createSelector(
  (state) => state.films,
  (films) => films.totalFilms
);

const selectCurrentPage = createSelector(
  (state) => state.films,
  (films) => films.currentPage
);

const selectTotalPages = createSelector(
  (state) => state.films,
  (films) => films.totalPages
);

const selectSearchQuery = createSelector(
  (state) => state.films,
  (films) => films.searchQuery
);

const selectTypeQuery = createSelector(
  (state) => state.films,
  (films) => films.typeQuery
);

const selectIsLoading = createSelector(
  (state) => state.films,
  (films) => films.isLoading
);

const selectError = createSelector(
  (state) => state.films,
  (films) => films.error
);

export { selectFilms, selectTotalFilms, selectCurrentPage, selectSearchQuery, 
  selectTotalPages, selectIsLoading, selectError, selectTypeQuery };