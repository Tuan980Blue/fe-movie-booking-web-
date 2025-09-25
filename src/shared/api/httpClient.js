import axios from 'axios';

const httpClient = axios.create({
  baseURL: process.env.API_BASE_URL || 'http://localhost:5000/api',
  timeout: 15000,
});

httpClient.interceptors.request.use((config) => {
  // Attach auth token if available
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global error handling placeholder
    return Promise.reject(error);
  }
);

export default httpClient;


