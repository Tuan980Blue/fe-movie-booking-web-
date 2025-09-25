const endpoints = {
  auth: {
    login: '/auth/login',
    refresh: '/auth/refresh-token',
    me: '/users/me',
  },
  movies: {
    list: '/movies',
    detail: (id) => `/movies/${id}`,
  },
  bookings: {
    create: '/bookings',
    detail: (id) => `/bookings/${id}`,
  },
};

export default endpoints;


