import httpClient from '../shared/api/httpClient';
import endpoints from '../shared/api/endpoints';

export const createBooking = async (payload) => {
  const { data } = await httpClient.post(endpoints.bookings.create, payload);
  return data;
};

export const getBookingDetail = async (bookingId) => {
  const { data } = await httpClient.get(endpoints.bookings.detail(bookingId));
  return data;
};


