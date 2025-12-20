import useSearchBar from "./hooks/useSearchBar";
import type { SearchBarProps } from "./SearchBar.types";

const SearchBar = ({ onSearchQueryChange, onTypeQueryChange, onSearch }: SearchBarProps) => {
    const [ onQueryChange, onTypeChange, searchQuery, typeQuery ] = useSearchBar(onSearchQueryChange, onTypeQueryChange, onSearch);
    return (<div className="mt-10 sm:mt-25 mb-5">
        Search: <input type="text" className="ml-5 input sm:min-w-100 mr-5" value={ searchQuery } onChange={ onQueryChange } />
        Type: <select onChange={ onTypeChange }>
            <option selected={ typeQuery === "movie" }>movie</option>
            <option selected={ typeQuery === "series" }>series</option>
            <option selected={ typeQuery === "episode" }>episode</option>
            <option selected={ typeQuery === "any" }>any</option>
        </select>
    </div>);
}

export default SearchBar;