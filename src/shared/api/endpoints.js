const endpoints = {
  auth: {
    login: '/auth/login',
    refresh: '/auth/refresh-token',
    register: '/auth/register',
  },
  movies: {
    list: '/movies',
    detail: (id) => `/movies/${id}`,
  },
  bookings: {
    create: '/bookings',
    detail: (id) => `/bookings/${id}`,
  },
  users: {
    me: '/users/me',
    updateProfile: '/users/me',
    changePassword: '/auth/change-password',
  },
};

export default endpoints;


