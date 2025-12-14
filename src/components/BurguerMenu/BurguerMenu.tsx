import { useSelector } from "react-redux";
import { selectUserDisplayName } from "../../features/users/store/selectors/userSelectors";
import React from "react";
import supabaseClient from "../../supabase/supabaseClient";

const BurguerMenu = () => {
    const displayName = useSelector(selectUserDisplayName);
    const [ isOpen, setIsOpen ] = React.useState(false);
    const menuOnClick = () => {
        setIsOpen(!isOpen);
    }
    const onLogoutClick = () => {
        supabaseClient.auth.signOut();
    }

    return <div>
        <button onClick={ menuOnClick } className="text-secondary text-2xl">{ isOpen ? "x" : "☰" }</button>
        <div className={ isOpen ? "block" : "hidden" }>
            { displayName }
            <div onClick={ onLogoutClick }>logout</div>
        </div>
    </div>
}

export default BurguerMenu;