import { useDispatch, useSelector } from "react-redux";
import { useNavigate, type NavigateFunction } from "react-router";
import { selectError, selectFilm, selectIsLoading } from "../../store/selectors/filmSelectors";
import * as React from "react";
import { searchFilm, setImdb } from "../../store/slice/filmSlice";
import type { AppDispatch } from "../../../../store/store";
import type { Film } from "../../../../components/FilmCard/FilmCard.types";

const useDetail = (imdb: string): [NavigateFunction, Film, boolean, typeof selectError] => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const loadedFilm = useSelector(selectFilm);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);
    
    React.useEffect(() => {
        dispatch(setImdb(imdb));
        dispatch(searchFilm());
    }, [dispatch, imdb]);

    return [navigate, loadedFilm, isLoading, error];
}

export default useDetail;