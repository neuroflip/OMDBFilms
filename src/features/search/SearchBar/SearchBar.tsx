import useSearchBar from "./hooks/useSearchBar";
import type { SearchBarProps } from "./SearchBar.types";

const SearchBar = ({ onSearchQueryChange, onSearch }: SearchBarProps) => {
    const [ onQueryChange, searchQuery ] = useSearchBar(onSearchQueryChange, onSearch);
    return (<div className="mt-10 sm:mt-25 mb-5">
        Search: <input type="text" className="ml-5 input sm:min-w-100" value={ searchQuery } onChange={ onQueryChange } />
    </div>);
}

export default SearchBar;