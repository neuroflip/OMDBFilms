import * as React from "react";
import { useSelector } from "react-redux";
import { selectUserDisplayName } from "../../../features/users/store/selectors/userSelectors";
import supabaseClient from "../../../supabase/supabaseClient";

const useHeader = (): [ string, string, boolean, () => void, () => void ] => {
    const displayName = useSelector(selectUserDisplayName);
    const [ isOpen, setIsOpen ] = React.useState(false);
    const contentClass = `row-start-2 col-start-1 col-end-3 mt-5 
        rounded border border-primary sm:border-0 p-5 sm:p-0
        sm:mt-0 sm:block ${isOpen ? "block" : "hidden" }
        sm:row-start-1 sm:col-start-2 sm:col-end-3 sm:justify-self-end`;
    const menuOnClick = () => {
        setIsOpen(!isOpen);
    }
    const onLogoutClick = () => {
        supabaseClient.auth.signOut();
    }

    return [ displayName, contentClass, isOpen, menuOnClick, onLogoutClick ];
}

export default useHeader;