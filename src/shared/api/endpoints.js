const endpoints = {
  auth: {
    login: '/auth/login',
    refresh: '/auth/refresh-token',
    register: '/auth/register',
  },
  cinemas: {
    roomSeatLayout: (cinemaId, roomId) => `/cinemas/${cinemaId}/rooms/${roomId}/seats/layout`,
  },
  users: {
    me: '/users/me',
    updateProfile: '/users/me',
    changePassword: '/auth/change-password',
  },
  movies: {
    list: '/movies',
    detail: (id) => `/movies/${id}`,
  },
  showtimes: {
    list: '/showtimes',
    byMovie: (movieId) => `/showtimes/movie/${movieId}`,
  },
  bookings: {
    create: '/bookings',
    detail: (id) => `/bookings/${id}`,
  },
};

export default endpoints;


