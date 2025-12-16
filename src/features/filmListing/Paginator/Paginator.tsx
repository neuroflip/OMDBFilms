import usePaginator from "./hooks/usePaginator";
import type { PaginatorProps } from "./Paginator.types";

const Paginator = ({ onPageClick }: PaginatorProps) => {
    const [ currentPage, pages, totalFilms, totalPages, onPageClickHandler ] = usePaginator(onPageClick);
    return <div className="rounded-xl overflow-hidden ">
        Total films: { totalFilms } Pages: 
            <span className="cursor-pointer" data-page={Math.max(currentPage-1, 0)} onClick={ onPageClickHandler }>&lt;</span>
            { pages }
            <span className="cursor-pointer" data-page={Math.min(currentPage+1, totalPages)} onClick={ onPageClickHandler }>&gt;</span>
    </div>; 
}

export default Paginator;