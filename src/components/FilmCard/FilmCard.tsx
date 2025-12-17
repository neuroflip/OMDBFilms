import type { CardProps } from "./FilmCard.types";
import { NavLink } from "react-router";

import imageNotFound from './assets/images/404.png';

const FilmCard = ({ film, showActions = true, children }: CardProps) => {
    const onImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
        (event.target as HTMLImageElement).src = imageNotFound;
    }
    const image = <img className="mx-auto m-1 rounded-xl w-ful"
        src={film.Poster} onError={ onImageError } alt={`poster image for ${film .Title} film`} />;

    return <article className={`${ !showActions ? "hover:scale-105 cursor-pointer" : ""} rounded-xl overflow-hidden mx-5 mb-20`}>
        { film.Poster && !showActions ? <NavLink to={`/film/${film.imdbID}`}>
                { image }
            </NavLink> : <>{ image }</>
        }
        <h2 className="text-xl font-bold">{ film.Title }</h2>
        { children }
    </article>; 
}

export default FilmCard;