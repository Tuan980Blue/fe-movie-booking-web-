import httpClient from '../shared/api/httpClient';
import endpoints from '../shared/api/endpoints';

export const fetchMovies = async (params) => {
  const { data } = await httpClient.get(endpoints.movies.list, { params });
  return data;
};

export const fetchMovieDetail = async (movieId) => {
  const { data } = await httpClient.get(endpoints.movies.detail(movieId));
  return data;
};


