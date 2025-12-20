import type { Film } from "../../../../components/FilmCard/FilmCard.types"

interface FilmsState {
  films: Array<Film>,
  currentPage: number,
  searchQuery: string,
  typeQuery: string,
  totalFilms: number,
  totalPages: number,
  isLoading: boolean,
  error: string | null
}

const initialState: FilmsState = {
  films: [],
  currentPage: 1,
  searchQuery: "",
  typeQuery: "movie",
  totalFilms: 0,
  totalPages: 0,
  isLoading: false,
  error: null
}

export { type FilmsState, initialState }