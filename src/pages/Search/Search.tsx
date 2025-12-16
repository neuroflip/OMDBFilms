import Searcher from "../../features/search/Seach/Search";
import useGuard from "../../hooks/useGuard";

const Search = () => {
    useGuard();

    return <>
        <Searcher />
    </>
        
}

export default Search;