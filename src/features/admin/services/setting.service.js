import { API_BASE_URL } from "../../../constants/api";
import useAuthStore from "../../../stores/useAuthStore";

export const settingService = {
  getSettings: async () => {
    try {
      const token = useAuthStore.getState().token;
      const response = await fetch(`${API_BASE_URL}/settings`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.meta?.message || "Failed to fetch settings");
      return data.data;
    } catch (error) {
      console.error("[SettingService] GET Error:", error);
      throw error;
    }
  },

  updateSettings: async (settingsData) => {
    try {
      const token = useAuthStore.getState().token;
      const response = await fetch(`${API_BASE_URL}/settings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(settingsData)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.meta?.message || "Failed to update settings");
      return data.data;
    } catch (error) {
      console.error("[SettingService] POST Error:", error);
      throw error;
    }
  }
};
