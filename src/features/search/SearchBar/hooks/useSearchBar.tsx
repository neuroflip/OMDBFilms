import * as React from "react";

const useSearchBar = (onSearchQueryChange: (searchQuery: string) => void, onSearch: () => void):  
    [ (event: React.ChangeEvent<HTMLInputElement>) => void, string ] => {
    const [ searchQuery, setSearchQuery ] = React.useState("");
    const [ bouncingTimeout, setBouncingTimeout ] = React.useState(0);
    const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setSearchQuery(value);
        onSearchQueryChange(value);
        if (bouncingTimeout !== 0) {
            clearTimeout(bouncingTimeout);
        }
        if (value.length > 0 && value.trim().length > 0) {
            setBouncingTimeout(setTimeout(() => {
                onSearch();
            }, 1000));
        }
    }

    return [ onQueryChange, searchQuery ];
}

export default useSearchBar;