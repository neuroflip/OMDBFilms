import { useDispatch, useSelector } from "react-redux";
import { selectCurrentPage, selectTotalFilms } from "../../search/SearchBar/store/selectors/filmsSelectors";
import { setPage } from "../../search/SearchBar/store/slice/filmsSlice";

const ITEMS_PER_PAGE = 10;
type PaginatorProps = {
    onPageClick: () => void
}

const Paginator = ({ onPageClick }: PaginatorProps) => {
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
        pages.push(<span className={`cursor-pointer ${ currentPage === i ? "font-bold underline" : "" }`} data-page={ i } onClick={ onPageClickHandler }> { i } </span>);
    }

    return <div className="rounded-xl overflow-hidden ">
        Total films: { totalFilms } Pages: 
            <span className="cursor-pointer" data-page={Math.max(currentPage-1, 0)} onClick={ onPageClickHandler }>&lt;</span>
            { pages }
            <span className="cursor-pointer" data-page={Math.min(currentPage+1, totalPages)} onClick={ onPageClickHandler }>&gt;</span>
    </div>; 
}

export default Paginator;