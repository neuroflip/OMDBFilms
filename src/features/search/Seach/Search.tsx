import SearchBar from "../SearchBar/SearchBar";
import FilmList from "../../filmListing/FilmList/FilmList";
import useSearch from "./hooks/useSeach";

const Search = () => {
    const [ films, error, totalPages, totalFilms, currentPage, isLoading, onInfiniteScrollNextLoad, onSearch, onSearchQueryChange ] = useSearch();

    return <>
        <SearchBar onSearchQueryChange={ onSearchQueryChange } onSearch={ onSearch }/>
        <FilmList films= { films } error={ error } totalFilms={ totalFilms } totalPages={ totalPages } 
            currentPage={ currentPage }  isLoading={ isLoading } onInfiniteScrollNextLoad={ onInfiniteScrollNextLoad } />
    </>
        
}

export default Search;