type Rating = {
    Source: string,
    Value: string
}

type Film = {
    Title: string,
    Year: string,
    Rated?: string,
    Released?: string,
    Runtime?: string,
    Genre?: string,
    Director?: string,
    Writer?: string,
    Actors?: string,
    Plot?: string,
    Language?: string,
    Country?: string,
    Awards?: string,
    Poster: string,
    Ratings?: Array<Rating>,
    Metascore?: string,
    imdbRating?: string,
    imdbVotes?: string,
    imdbID: string,
    Type?: string,
    Dvd?: string,
    BoxOffice?: string,
    Production?: string,
    Website?: string,
    Response?: string
    
}
type CardProps = {
    children?: React.ReactElement
    film: Film,
    showActions?: boolean
};

export type { Film, Rating, CardProps };