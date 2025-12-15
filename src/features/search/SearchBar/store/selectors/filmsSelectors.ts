import { createSelector } from "@reduxjs/toolkit";

const selectFilms = createSelector(
  (state) => state.films,
  (films) => films.films
)

const selectTotalFilms = createSelector(
  (state) => state.films,
  (films) => films.totalFilms
)

const selectCurrentPage = createSelector(
  (state) => state.films,
  (films) => films.currentPage
)

const selectSearchQuery = createSelector(
  (state) => state.films,
  (films) => films.searchQuery
)

export { selectFilms, selectTotalFilms, selectCurrentPage, selectSearchQuery };