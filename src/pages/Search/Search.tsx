import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Searcher from "../../features/search/Seach/Search";
import useGuard from "../../hooks/useGuard";

const Search = () => {
    useGuard();

    return <><Header />
        <main className="flex flex-col w-full min-h-[80vh]">
            <Searcher />
        </main>
        <Footer />
    </>  
}

export default Search;