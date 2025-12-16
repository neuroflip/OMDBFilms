import useSearchBar from "./hooks/useSearchBar";
import type { SearchBarProps } from "./SearchBar.types";

const SearchBar = ({ onSearchQueryChange, onSearch }: SearchBarProps) => {
    const [ onQueryChange, searchQuery ] = useSearchBar(onSearchQueryChange, onSearch);
    return (<div className="mt-25 mb-5">
        Search: <input type="text" className="input" value={ searchQuery } onChange={ onQueryChange } />
    </div>);
}

export default SearchBar;