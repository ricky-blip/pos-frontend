import useAuthStore from '../../../stores/useAuthStore';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const getAuthHeader = () => {
  const token = useAuthStore.getState().token;
  return { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
};

export const userService = {
  async getAllUsers() {
    const res = await fetch(`${BASE_URL}/api/users`, {
      headers: getAuthHeader(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.meta?.message || 'Gagal mengambil daftar user');
    return data.data;
  },

  async createUser(payload) {
    const res = await fetch(`${BASE_URL}/api/users`, {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.meta?.message || 'Gagal membuat user baru');
    return data.data;
  },

  async updateUser(id, payload) {
    const res = await fetch(`${BASE_URL}/api/users/${id}`, {
      method: 'PUT',
      headers: getAuthHeader(),
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.meta?.message || 'Gagal memperbarui user');
    return data.data;
  },

  async resetPassword(id, newPassword) {
    const res = await fetch(`${BASE_URL}/api/users/${id}/reset-password`, {
      method: 'PUT',
      headers: getAuthHeader(),
      body: JSON.stringify({ newPassword }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.meta?.message || 'Gagal mereset password');
    return data;
  },

  async deleteUser(id) {
    const res = await fetch(`${BASE_URL}/api/users/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.meta?.message || 'Gagal menghapus user');
    return data;
  },
};
