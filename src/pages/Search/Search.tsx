import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import useGuard from "../../hooks/useGuard";

const Search = () => {
    useGuard();

    return <>
        <Header />
        Search
        <Footer />
        !</>
        
}

export default Search;