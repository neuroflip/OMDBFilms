import type { Film } from "../../../../components/FilmCard/FilmCard.types"

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

export { type FilmState, initialState }