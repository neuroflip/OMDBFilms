import Card from "../Card/Card";
import type { FilmListProps } from "./FilmList.types";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";

const FilmList = ({ films, onInfiniteScrollNextLoad }: FilmListProps) => {    
    useIntersectionObserver(onInfiniteScrollNextLoad);
    
    return <div className="grid grid-cols-2">
        { films.map((film) => <Card key={ film.ImdbID } film={ film } />) }
        { films.length === 0 ? <div className="col-start-1 col-end-3 m-25 h-[30vh]">No results</div> :
            <div id="listIntersectionElement"></div>
        }
    </div>
}

export default FilmList;