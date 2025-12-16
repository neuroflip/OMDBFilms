import { useParams } from "react-router";

const FilmDetail = () => {
    const id = useParams().id;

    return <>{ id }</>;
}

export default FilmDetail;