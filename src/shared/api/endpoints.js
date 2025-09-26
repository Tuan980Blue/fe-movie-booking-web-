const endpoints = {
  auth: {
    login: '/auth/login',
    refresh: '/auth/refresh-token',
    register: '/auth/register',
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
  bookings: {
    create: '/bookings',
    detail: (id) => `/bookings/${id}`,
  },
};

export default endpoints;


