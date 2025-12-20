import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../../../store/store";
import { selectCurrentPage, selectError, selectFilms, selectIsLoading, selectTotalFilms } from "../../store/selectors/filmsSelectors";
import { searchFilms, setPage, setSearchQuery, setQueryType, cleanFilms } from "../../store/slice/filmsSlice";
import type { Film } from "../../../../components/FilmCard/FilmCard.types";

const ITEMS_PER_PAGE = 10;

const useSearch = (): [ Array<Film>, string | null, number, number, number, boolean, 
    () => void, () => void, (searchQuery: string) => void, (searchType: string) => void ] => {
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
        dispatch(cleanFilms());
        dispatch(searchFilms());
    }

    const onInfiniteScrollNextLoad = () => {
        const nextPage = currentPage + 1;

        if (totalPages >= nextPage && !isLoading) {
            dispatch(setPage(nextPage));
            dispatch(searchFilms());
        }
    }

    const onSearchTypeChange = (searchType: string) => {
        dispatch(setQueryType(searchType));
    }

    return [ films, error, totalPages, totalFilms, currentPage, isLoading,
        onInfiniteScrollNextLoad, onSearch, onSearchQueryChange, onSearchTypeChange ];
}

export default useSearch;