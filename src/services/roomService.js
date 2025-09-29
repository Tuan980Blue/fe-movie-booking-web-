import httpClient from '../shared/api/httpClient';
import endpoints from '../shared/api/endpoints';

export async function getSeatLayoutApi(cinemaId, roomId) {
  const url = endpoints.cinemas.roomSeatLayout(cinemaId, roomId);
  const { data } = await httpClient.get(url);
  return data;
}


