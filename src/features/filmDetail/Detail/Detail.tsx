import { NavLink } from "react-router";
import Spinner from '../../../components/Spinner/Spinner';
import FilmCard from '../../../components/FilmCard/FilmCard';
import type { DetailProps } from './Detail.types';
import useDetail from './hooks/useDetail';

const Detail = ({ imdb }: DetailProps) => {
    const [navigate, loadedFilm, isLoading, error] = useDetail(imdb);

    return <div className="flex flex-col m-auto max-w-lg bg-linear-90 rounded-xl p-5 align-middle items-center justify-center">
        { isLoading ? <Spinner></Spinner> : !error && loadedFilm ? 
            <>
                <FilmCard film={ loadedFilm } showActions={ true }>
                    <div className="text-left mt-10">
                        <div><strong>Plot</strong>: { loadedFilm.Plot }</div>
                        <br />
                        <div><strong>Genre</strong>: { loadedFilm.Genre }</div>
                        <div><strong>Year</strong>: { loadedFilm.Year }</div>
                        <div><strong>Type</strong>: { loadedFilm.Type }</div>
                        <div><strong>Rated</strong>: { loadedFilm.Rated }</div>
                        <div><strong>Production</strong>: { loadedFilm.Production }</div>
                        <div><strong>Director</strong>: { loadedFilm.Director }</div>
                        <div><strong>Actors</strong>: { loadedFilm.Actors }</div>
                        <div><strong>Awards</strong>: { loadedFilm.Awards }</div>
                        <div><strong>Imdb Rating</strong>: { loadedFilm.imdbRating }</div>
                        <div>
                            <a href={ `https://www.imdb.com/title/${loadedFilm.imdbID}/` } className="text-primary" target="_blank">imbd link</a>
                        </div>
                    </div>
                </FilmCard>
            </> : <>{ error }</> }
            <NavLink className="text-primary" to="/" onClick={(e) => { e.preventDefault(); navigate(-1)}}>Back</NavLink>
    </div>;
}

export default Detail;