import React from "react";
import Card from "../Card/Card";
import type { FilmListProps } from "./FilmList.types";

const FilmList = ({ films, onInfiniteScrollNextLoad }: FilmListProps) => {
    const lastElementRef = React.useRef(null);
    const handleIntersection: IntersectionObserverCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                onInfiniteScrollNextLoad();
            }
        });
    }
    const observer = new IntersectionObserver(handleIntersection);
    
    React.useEffect(() => {
        lastElementRef.current && observer.observe(lastElementRef.current);
    }, [lastElementRef.current])
    

    return <div className="grid grid-cols-2">
        { films.map((film) => <Card key={ film.ImdbID } film={ film } />) }
        { films.length === 0 ? <div className="col-start-1 col-end-3">No results</div> :
            <div ref={ lastElementRef }></div>
        }
    </div>
}

export default FilmList;