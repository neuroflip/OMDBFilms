import useSearchBar from "./hooks/useSearchBar";
import type { SearchBarProps } from "./SearchBar.types";

const SearchBar = ({ onSearchQueryChange, onTypeQueryChange, onSearch }: SearchBarProps) => {
    const [ onQueryChange, onTypeChange, searchQuery, typeQuery ] = useSearchBar(onSearchQueryChange, onTypeQueryChange, onSearch);
    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSearch();
        }
    }
    return (<div className="mt-10 sm:mt-25 mb-5">
        <strong>Search</strong>: 
        <input type="text" className="ml-5 input sm:min-w-100 mr-5"
            value={ searchQuery } placeholder="Search for a film, serie, episode..."
            onChange={ onQueryChange }
            onKeyDown={ onKeyDown } />
        <div className="sm:inline-block mt-5 sm:mt-0">
            <strong>Type</strong>: 
            <select value={ typeQuery } className="ml-3 p-4 border border-secondary rounded-xl" onChange={ onTypeChange }>
                <option>movie</option>
                <option>series</option>
                <option>episode</option>
                <option>any</option>
            </select>
            <input type="submit" hidden />
        </div>
    </div>);
}

export default SearchBar;