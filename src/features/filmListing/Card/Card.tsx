
import type { CardProps } from "./Cart.types";

const Card = ({ film }: CardProps) => {
    return <article className="rounded-xl overflow-hidden ">
        <h2 className="text-xl font-bold">{ film.Title }</h2>
        { film.Poster && <img className="mx-auto mb-15 mt-5 rounded-xl" src={film.Poster} alt={`poster image for ${film.Title} film`} /> }
    </article>; 
}

export default Card;