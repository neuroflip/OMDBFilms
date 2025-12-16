import * as React from "react";

const useSearchBar = (onSearchQueryChange: (searchQuery: string) => void): [ (event: React.ChangeEvent<HTMLInputElement>) => void, string ] => {
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

    return [ onQueryChange, searchQuery ];
}

export default useSearchBar;