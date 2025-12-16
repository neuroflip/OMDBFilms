import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../../../store/store";
import { selectCurrentPage, selectError, selectFilms, selectIsLoading, selectTotalFilms } from "../../store/selectors/filmsSelectors";
import { searchFilms, setPage, setSearchQuery } from "../../store/slice/filmsSlice";
import type { Film } from "../../../filmListing/Card/Cart.types";

const ITEMS_PER_PAGE = 10;

const useSearch = (): [ Array<Film>, string, number, number, number, boolean, () => void, () => void, (searchQuery: string) => void ] => {
    const dispatch = useDispatch<AppDispatch>();
    const films = useSelector(selectFilms);
    const isLoading = useSelector(selectIsLoading);
    const totalFilms = useSelector(selectTotalFilms);
    const totalPages = Math.ceil(totalFilms / ITEMS_PER_PAGE);
    const currentPage = useSelector(selectCurrentPage);
    const error = useSelector(selectError);

    const onSearchQueryChange = (searchQuery: string) => {
        dispatch(setSearchQuery(searchQuery));
    }

    const onSearch = () => {
        dispatch(setPage(1));
        dispatch(searchFilms());
    }

    const onInfiniteScrollNextLoad = () => {
        const nextPage = currentPage + 1;

        if (totalPages >= nextPage && !isLoading) {
            dispatch(setPage(nextPage));
            dispatch(searchFilms());
        }
    }

    return [ films, error, totalPages, totalFilms, currentPage, isLoading, onInfiniteScrollNextLoad, onSearch, onSearchQueryChange ];
}

export default useSearch;