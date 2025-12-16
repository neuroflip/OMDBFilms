import useSearchBar from "./hooks/useSearchBar";
import type { SearchBarProps } from "./SearchBar.types";

const SearchBar = ({ onSearchQueryChange }: SearchBarProps) => {
    const [ onQueryChange, searchQuery ] = useSearchBar(onSearchQueryChange);
    return (<div className="mt-25 mb-25">
        Search: <input type="text" className="input" value={ searchQuery } onChange={ onQueryChange } />
    </div>);
}

export default SearchBar;