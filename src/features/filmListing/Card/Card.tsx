import type { CardProps } from "./Cart.types";

import imageNotFound from './assets/images/404.png';

const Card = ({ film }: CardProps) => {
    const onImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
        (event.target as HTMLImageElement).src = imageNotFound;
    }

    return <article className="rounded-xl overflow-hidden mx-5 mb-20">
        { film.Poster && <img className="mx-auto m-1 rounded-xl w-ful" 
        src={film.Poster} onError={ onImageError } alt={`poster image for ${film.Title} film`} /> }
        <h2 className="text-xl font-bold">{ film.Title }</h2>
    </article>; 
}

export default Card;