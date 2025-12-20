import * as React from 'react';
import { NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setImdb } from '../store/slice/filmSlice';
import { searchFilm } from '../store/slice/filmSlice';
import { selectError, selectFilm, selectIsLoading } from '../store/selectors/filmSelectors';
import type { AppDispatch } from '../../../store/store';
import Spinner from '../../../components/Spinner/Spinner';
import FilmCard from '../../../components/FilmCard/FilmCard';
import type { DetailProps } from './Detail.types';

const Detail = ({ imdb }: DetailProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const loadedFilm = useSelector(selectFilm);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);
    
    React.useEffect(() => {
        dispatch(setImdb(imdb));
        dispatch(searchFilm());
    }, [dispatch, imdb]);

    return <div className="flex flex-col m-auto max-w-lg bg-linear-90 rounded-xl p-5 align-middle items-center justify-center">
        { isLoading ? <Spinner></Spinner> : !error && loadedFilm ? 
            <>
                <FilmCard film={ loadedFilm } showActions={ true }>
                    <div className="text-left mt-10">
                        <div><strong>Plot</strong>: { loadedFilm.Plot }</div>
                        <br />
                        <div><strong>Genre</strong>: { loadedFilm.Genre }</div>
                        <div><strong>Type</strong>: { loadedFilm.Type }</div>
                        <div><strong>Rated</strong>: { loadedFilm.Rated }</div>
                        <div><strong>Imdb Rating</strong>: { loadedFilm.imdbRating }</div>
                        <div><strong>Director</strong>: { loadedFilm.Director }</div>
                        <div><strong>Awards</strong>: { loadedFilm.Awards }</div>
                    </div>
                </FilmCard>
            </> : <>{ error }</> }
            <NavLink className="text-primary" to="/" onClick={(e) => { e.preventDefault(); navigate(-1)}}>Back</NavLink>
    </div>;
}

export default Detail;