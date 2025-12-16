import Card from "../Card/Card";
import type { FilmListProps } from "./FilmList.types";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import Spinner from "../../../components/Spinner/Spinner";

const FilmList = ({ films, totalFilms, currentPage, totalPages, isLoading, error, onInfiniteScrollNextLoad }: FilmListProps) => {
    const intersectionElementRef = useIntersectionObserver(onInfiniteScrollNextLoad, currentPage + 1 <= totalPages);

    return <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 sm:px-20">
        <div className="col-start-1 col-end-2 sm:col-end-4 lg:col-end-5 mb-15">
            { error ? `Error from API: ${error}` : films.length > 0 ? `${totalFilms} results` : <></> }
        </div>
        { films.map((film) => <Card key={ film.ImdbID } film={ film } />) }
        { isLoading ? <Spinner extraClass="col-start-1 col-end-2 sm:col-end-4 lg:col-end-5 mb-15 m-25" /> : <></> }
        { films.length > 0 ? <div ref={ intersectionElementRef }></div> : <></> }
    </div>
}

export default FilmList;