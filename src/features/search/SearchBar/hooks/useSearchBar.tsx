import * as React from "react";

const useSearchBar = (onSearchQueryChange: (searchQuery: string) => void, onTypeQueryChange: (searchQuery: string) => void, onSearch: () => void):  
    [ (event: React.ChangeEvent<HTMLInputElement>) => void, (event: React.ChangeEvent<HTMLSelectElement>) => void,
        string, string ] => {
    const [ searchQuery, setSearchQuery ] = React.useState("");
    const [ typeQuery, setTypeQuerty ] = React.useState("movie");
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

    const onTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;

        onTypeQueryChange(value);
        setTypeQuerty(value);
    }
    return [ onQueryChange, onTypeChange, searchQuery, typeQuery ];
}

export default useSearchBar;