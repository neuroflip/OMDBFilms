import type { Film } from "../Card/Cart.types";

type FilmListProps = {
    films: Array<Film>,
    totalFilms: number,
    currentPage: number,
    totalPages: number,
    isLoading: boolean,
    error: string | null,
    onInfiniteScrollNextLoad: () => void
}

export type { FilmListProps };