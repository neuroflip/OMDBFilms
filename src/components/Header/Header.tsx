import { NavLink } from "react-router";
import useHeader from "./hooks/useHeader";


const Header = () => {
    const [ isUserLogged, displayName, contentClass, isOpen, menuOnClick, onLogoutClick ] = useHeader();

    return (<>
        <header className="grid items-center align-start grid-cols-2 grid-rows-auto px-4 py-4 fixed top-0 left-0 w-full">
            <a href="/" className="row-start-1 col-start-1 justify-self-start max-h-7">
                <h1 className="text-secondary font-bold text-lg">OMDB Films</h1>
            </a>
            <button onClick={ menuOnClick } className="text-secondary text-2xl justify-self-end max-h-5 sm:hidden">{ 
                isUserLogged ? (isOpen ? "x" : "☰") : "" 
            }</button>
            <div className={ contentClass }>
                <div className="block sm:inline sm:mr-5">Welcome back { displayName }</div>
                <NavLink to="/search" className="link block sm:inline sm:mr-5">search</NavLink>
                <a href="/" onClick={ onLogoutClick } className="link block sm:inline">logout</a>
            </div>
        </header>
    </>);
}

export default Header;