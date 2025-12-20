const fetchFilm = async (apiUrl: string, term: string, type: string, page?: number) => {
  const queryUrl = `${apiUrl}${term}${page ? `&page=${page}` : '' }${ type ? `&type=${type}`: ''}&apikey=${import.meta.env.VITE_OMDB_APIKEY}`;
  const response = await fetch(queryUrl);

  if (response.ok) {
    const result = await response.json();

    return result
  } else {
    throw new Error(`Error loading film: ${response.status} - ${response.statusText}`);
  }
}

export { fetchFilm }