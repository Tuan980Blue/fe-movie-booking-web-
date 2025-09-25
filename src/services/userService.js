import httpClient from '../shared/api/httpClient';
import endpoints from '../shared/api/endpoints';

export async function updateProfileApi(payload) {
  // payload: { fullName, phone }
  const { data } = await httpClient.put(endpoints.users.updateProfile, payload);
  return data;
}

export async function changePasswordApi(payload) {
  // payload: { currentPassword, newPassword }
  const { data } = await httpClient.post(endpoints.users.changePassword, payload);
  return data;
}


