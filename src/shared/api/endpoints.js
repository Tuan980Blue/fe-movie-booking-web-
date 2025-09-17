const endpoints = {
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


