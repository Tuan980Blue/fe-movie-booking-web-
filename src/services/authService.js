import httpClient from '../shared/api/httpClient';
import endpoints from '../shared/api/endpoints';

// Giải mã payload của JWT (không verify chữ ký; chỉ để đọc claim)
function decodeJwtPayload(token) {
  try {
    const payloadBase64 = token.split('.')[1];
    const json = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decodeURIComponent(escape(json)));
  } catch (_e) {
    return null;
  }
}

export async function loginApi({ email, password }) {
  const url = endpoints.auth.login; // baseURL đã có '/api' trong httpClient
  const { data } = await httpClient.post(url, { email, password });
  return data;
}

export async function registerApi({ email, password, fullName }) {
  const url = endpoints.auth.register;
  const { data } = await httpClient.post(url, { email, password, fullName });
  return data;
}

export function parseUserFromAccessToken(accessToken) {
  const payload = decodeJwtPayload(accessToken);
  if (!payload) return null;
  // Mapping một số claim phổ biến từ token mẫu bạn cung cấp
  const user = {
    id: payload.sub,
    email: payload.email,
    name: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || payload.name || '',
    role:
      payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ||
      payload.role ||
      'user',
  };
  return user;
}

export async function getMeApi() {
  const url = endpoints.auth.me;
  const { data } = await httpClient.get(url);
  return data;
}

export function mapMeResponseToUser(me) {
  if (!me) return null;
  const roles = Array.isArray(me.roles) ? me.roles.map(r => (r || '').toString().toLowerCase()) : [];
  return {
    id: me.id,
    email: me.email,
    name: me.fullName || me.name || '',
    phone: me.phone || '',
    status: me.status || '',
    createdAt: me.createdAt,
    updatedAt: me.updatedAt,
    roles,
    role: roles[0] || 'user',
  };
}


