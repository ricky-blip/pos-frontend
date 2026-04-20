import { API_BASE_URL } from "../../../constants/api";
import useAuthStore from "../../../stores/useAuthStore";

const getAuthHeader = () => {
  const token = useAuthStore.getState().token;
  return { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
};

export const activityService = {
  async getLogs(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE_URL}/logs${query ? `?${query}` : ''}`, {
      headers: getAuthHeader(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.meta?.message || 'Gagal mengambil log aktivitas');
    return data.data;
  },
};
