import { API_BASE_URL } from "../../../constants/api";
import useAuthStore from "../../../stores/useAuthStore";

const getAuthHeader = () => {
  const token = useAuthStore.getState().token;
  return { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
};

export const authService = {
  /**
   * Change current user password
   */
  changePassword: async (oldPassword, newPassword) => {
    const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
      method: 'PUT',
      headers: getAuthHeader(),
      body: JSON.stringify({ oldPassword, newPassword }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data?.meta?.message || "Gagal mengubah password");
    return data;
  },

  /**
   * Update profile (username/email) with current password confirmation
   */
  updateProfile: async (currentPassword, updateData) => {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: getAuthHeader(),
      body: JSON.stringify({ currentPassword, ...updateData }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data?.meta?.message || "Gagal memperbarui profil");
    return data.data;
  },
};
