import { useParams } from "react-router";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Detail from "../../features/filmDetail/Detail/Detail";

const FilmDetail = () => {
    const id = useParams().id;

    return <>
        <Header />
        <main className="flex flex-col w-full min-h-[80vh]">
            { id ? <Detail imdb={ id } /> : <>Film not loaded</> }
        </main>
        <Footer />
    </>;
}

export default FilmDetail;