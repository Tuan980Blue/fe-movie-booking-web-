import httpClient from '../shared/api/httpClient';
import endpoints from '../shared/api/endpoints';

/**
 * Fetch paginated list of movies
 * params can include: page, pageSize, keyword, genre, status, sort
 * Returns shape: { items: Movie[], page, pageSize, totalItems }
 */
export async function getMoviesApi(params = {}) {
  const { data } = await httpClient.get(endpoints.movies.list, { params });
  return data;
}

/**
 * Fetch single movie detail
 */
export async function getMovieDetailApi(id) {
  const { data } = await httpClient.get(endpoints.movies.detail(id));
  return data;
}


