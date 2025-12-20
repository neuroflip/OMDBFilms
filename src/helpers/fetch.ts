const genericFetch = async (apiUrl: string) => {
  const response = await fetch(apiUrl);

  if (response.ok) {
    const result = await response.json();

    return result
  } else {
    throw new Error(`Error loading film: ${response.status} - ${response.statusText}`);
  }
}

const fetchFilm = async (apiUrl: string, imdbID: string) => {
  const queryUrl = `${apiUrl}${imdbID}&apikey=${import.meta.env.VITE_OMDB_APIKEY}`;
  
  return await genericFetch(queryUrl);
}

const searchFilm = async (apiUrl: string, term: string, type: string, page?: number) => {
  const queryUrl = `${apiUrl}${term}${page ? `&page=${page}` : '' }${ type ? `&type=${type}`: ''}&apikey=${import.meta.env.VITE_OMDB_APIKEY}`;

  return await genericFetch(queryUrl);
}

export { fetchFilm, searchFilm }