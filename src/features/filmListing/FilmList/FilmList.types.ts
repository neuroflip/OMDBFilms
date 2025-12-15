import type { Film } from "../Card/Cart.types";

type FilmListProps = {
    films: Array<Film>,
    onInfiniteScrollNextLoad: () => void
}

export type { FilmListProps };