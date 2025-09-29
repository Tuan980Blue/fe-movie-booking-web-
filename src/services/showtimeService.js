import httpClient from '../shared/api/httpClient';
import endpoints from '../shared/api/endpoints';

/**
 * Fetch paginated list of showtimes
 * params can include: page, pageSize, date, movieId, theaterId, auditoriumId, sort
 * Returns shape: { items: Showtime[], page, pageSize, totalItems }
 */
export async function getShowtimesApi(params = {}) {
  const { data } = await httpClient.get(endpoints.showtimes.list, { params });
  return data;
}

/**
 * Fetch showtimes for a specific movie
 */
export async function getShowtimesByMovieApi(movieId, params = {}) {
  const { data } = await httpClient.get(endpoints.showtimes.byMovie(movieId), { params });
  return data;
}



