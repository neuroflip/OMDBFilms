const Header = () => {
    return (<>
        <header className="flex items-center justify-between px-4 py-4 fixed top-0 left-0 w-full">
            <button className="text-secondary text-2xl">☰</button>
            <a href="/">
                <h1 className="text-secondary font-bold text-lg">OMDB Films</h1>
            </a>
        </header>
    </>);
}

export default Header;