const fetchFilm = async (apiUrl: string, term: string, page?: number) => {
  const response = await fetch(`${apiUrl}${term}${page ? `&page=${page}` : ''}&apikey=${import.meta.env.VITE_OMDB_APIKEY}`);

  if (response.ok) {
    const result = await response.json();

    return result
  } else {
    throw new Error(`Error loading film: ${response.status} - ${response.statusText}`);
  }
}

export { fetchFilm }