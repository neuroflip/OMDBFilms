import { useDispatch, useSelector } from "react-redux";
import { selectCurrentPage, selectTotalFilms } from "../../../search/SearchBar/store/selectors/filmsSelectors";
import { ITEMS_PER_PAGE } from "../Paginator.types";
import { setPage } from "../../../search/SearchBar/store/slice/filmsSlice";
import type { JSX } from "react";

const usePaginator = (onPageClick: () => void): 
  [ number, Array<JSX.Element>, number, number, (event: React.MouseEvent<HTMLSpanElement>) => void] => {
    const dispatch = useDispatch();
    const totalFilms = useSelector(selectTotalFilms);
    const totalPages = Math.ceil(totalFilms / ITEMS_PER_PAGE);
    const currentPage = useSelector(selectCurrentPage);
    const pages = [];
    const onPageClickHandler = (event: React.MouseEvent<HTMLSpanElement>) => {
        const page = Number((event.target as HTMLSpanElement).dataset.page);

        dispatch(setPage(page));
        onPageClick();
        window.scroll(0,0);
    }

    for(let i = 1; i <= totalPages; i++) {
        pages.push(<span className={`cursor-pointer ${ currentPage === i ? "font-bold underline" : "" }`}
          data-page={ i } onClick={ onPageClickHandler }> { i } </span>);
    }

    return [ currentPage, pages, totalFilms, totalPages, onPageClickHandler ];
}

export default usePaginator;
