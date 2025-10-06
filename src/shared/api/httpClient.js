import axios from 'axios';
import endpoints from './endpoints';
import { parseUserFromAccessToken } from '../../services/authService';

// Cookie helpers (đơn giản). Lưu ý: Cookie phía client không thể đặt HttpOnly.
function setCookie(name, value, options = {}) {
  const { days, path = '/', secure = false, sameSite = 'Lax' } = options;
  let expires = '';
  if (typeof days === 'number') {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  const secureFlag = secure ? '; Secure' : '';
  const sameSiteAttr = `; SameSite=${sameSite}`;
  document.cookie = `${name}=${encodeURIComponent(value || '')}${expires}; path=${path}${secureFlag}${sameSiteAttr}`;
}

function getCookie(name) {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
  }
  return null;
}

function eraseCookie(name, path = '/') {
  document.cookie = `${name}=; Max-Age=-1; path=${path}`;
}

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 15000,
});

httpClient.interceptors.request.use((config) => {
  // Attach auth token if available
  const token = sessionStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error?.response?.status;

    // Nếu 401 và chưa thử refresh cho request này
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Lấy refresh token từ cookie
        const currentRefreshToken = getCookie('refresh_token');
        if (!currentRefreshToken) {
          throw new Error('No refresh token available');
        }

        // Gọi refresh token API
        const refreshResp = await axios.post(
          (process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api') + endpoints.auth.refresh,
          { refreshToken: currentRefreshToken }
        );

        const {
          accessToken: newAccessToken,
          accessTokenExpiresAt,
          refreshToken: newRefreshToken,
          refreshTokenExpiresAt,
        } = refreshResp.data || {};

        if (!newAccessToken) throw new Error('Refresh failed: no access token');

        // Cập nhật sessionStorage
        sessionStorage.setItem('access_token', newAccessToken);
        if (accessTokenExpiresAt) sessionStorage.setItem('access_token_expires_at', accessTokenExpiresAt);
        if (newRefreshToken) {
          // Lưu refresh token vào cookie (ví dụ 14 ngày hoặc theo expiresAt)
          const days = refreshTokenExpiresAt ? Math.max(1, Math.ceil((new Date(refreshTokenExpiresAt) - new Date()) / (1000 * 60 * 60 * 24))) : 14;
          setCookie('refresh_token', newRefreshToken, { days, path: '/', sameSite: 'Lax' });
        }
        

        // Cập nhật user từ access token mới (nếu thay đổi claim)
        const parsedUser = parseUserFromAccessToken(newAccessToken);
        if (parsedUser) {
          const normalizedRole = (parsedUser.role || 'user').toString().toLowerCase();
          const finalUser = {
            id: parsedUser.id,
            name: parsedUser.name || parsedUser.email?.split('@')[0] || '',
            email: parsedUser.email,
            role: normalizedRole,
          };
          localStorage.setItem('user_data', JSON.stringify(finalUser));
        }

        // Gắn header mới và retry
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return httpClient(originalRequest);
      } catch (refreshErr) {
        // Refresh thất bại: xoá phiên và trả lỗi
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('access_token_expires_at');
        eraseCookie('refresh_token');
        
        localStorage.removeItem('user_data');
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default httpClient;


