import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import useGuard from "../../hooks/useGuard";
import SearchBar from "../../features/search/SearchBar/SearchBar";
import FilmList from "../../features/filmListing/FilmList/FilmList";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentPage, selectError, selectFilms, selectIsLoading, selectTotalFilms } from "../../features/search/SearchBar/store/selectors/filmsSelectors";
import { searchFilms, setPage, setSearchQuery } from "../../features/search/SearchBar/store/slice/filmsSlice";
import type { AppDispatch } from "../../store/store";

const ITEMS_PER_PAGE = 10;

const Search = () => {
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
    useGuard();

    return <>
        <Header />
        <SearchBar onSearchQueryChange={ onSearchQueryChange } onSearch={ onSearch }/>
        <FilmList films= { films } error={ error } totalFilms={ totalFilms } totalPages={ totalPages } 
            currentPage={ currentPage }  isLoading={ isLoading } onInfiniteScrollNextLoad={ onInfiniteScrollNextLoad } />
        <Footer />
    </>
        
}

export default Search;