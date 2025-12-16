import * as React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import useGuard from "../../hooks/useGuard";
import SearchBar from "../../features/search/SearchBar/SearchBar";
import FilmList from "../../features/filmListing/FilmList/FilmList";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentPage, selectFilms } from "../../features/search/SearchBar/store/selectors/filmsSelectors";
import { searchFilms, setPage, setSearchQuery } from "../../features/search/SearchBar/store/slice/filmsSlice";
import type { AppDispatch } from "../../store/store";
//import Paginator from "../../features/filmListing/Paginator/Paginator";

const Search = () => {
    const dispatch = useDispatch<AppDispatch>();
    const films = useSelector(selectFilms);
    const currentPage = useSelector(selectCurrentPage);
    const onSearchQueryChange = (searchQuery: string) => {
        dispatch(setPage(1));
        dispatch(setSearchQuery(searchQuery));
        dispatch(searchFilms());
    }
    /*
    const onPageChange = () => {
        dispatch(searchFilms());
    } */
    const onInfiniteScrollNextLoad = () => {
        dispatch(setPage(currentPage + 1));
        dispatch(searchFilms());
    }
    useGuard();

    //        <Paginator onPageClick={ onPageChange } />
    return <>
        <Header />
        <SearchBar onSearchQueryChange={ onSearchQueryChange } />
        <FilmList films= { films } onInfiniteScrollNextLoad={ onInfiniteScrollNextLoad } />
        <Footer />
    </>
        
}

export default Search;