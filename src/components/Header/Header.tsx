import { useSelector } from "react-redux";
import { selectUserSession } from "../../features/users/store/selectors/userSelectors";
import BurguerMenu from "../BurguerMenu/BurguerMenu";

const Header = () => {
    const session = useSelector(selectUserSession);
    
    return (<>
        <header className="flex items-center justify-between px-4 py-4 fixed top-0 left-0 w-full">
            { session ? <BurguerMenu /> : <></> }
            <a href="/">
                <h1 className="text-secondary font-bold text-lg">OMDB Films</h1>
            </a>
        </header>
    </>);
}

export default Header;