import React from "react";
import type { SearchBarProps } from "./SearchBar.types";

const SearchBar = ({ onSearchQueryChange }: SearchBarProps) => {
    const [ searchQuery, setSearchQuery ] = React.useState("");
    const [ bouncingTimeout, setBouncingTimeout ] = React.useState(0);
    const search = () => {
        onSearchQueryChange(searchQuery);
    }
    const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setSearchQuery(value);
        if (bouncingTimeout !== 0) {
            clearTimeout(bouncingTimeout);
        }
        setBouncingTimeout(setTimeout(search, 2000));
    }

    return (<div className="mt-25 mb-25">
        Search: <input type="text" value={ searchQuery } onChange={ onQueryChange } />
    </div>);
}

export default SearchBar;