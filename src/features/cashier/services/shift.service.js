import { API_BASE_URL } from "../../../constants/api";
import useAuthStore from "../../../stores/useAuthStore";

export const shiftService = {
  getActiveShift: async () => {
    try {
      const token = useAuthStore.getState().token;
      const response = await fetch(`${API_BASE_URL}/shifts/active`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.meta?.message || "Failed to fetch active shift");
      return data.data;
    } catch (error) {
      console.error("[ShiftService] GET Error:", error);
      throw error;
    }
  },

  startShift: async (startingCash) => {
    try {
      const token = useAuthStore.getState().token;
      const response = await fetch(`${API_BASE_URL}/shifts/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ startingCash })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.meta?.message || "Failed to start shift");
      return data.data;
    } catch (error) {
      console.error("[ShiftService] START Error:", error);
      throw error;
    }
  },

  endShift: async (payload) => {
    try {
      const token = useAuthStore.getState().token;
      const response = await fetch(`${API_BASE_URL}/shifts/end`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.meta?.message || "Failed to end shift");
      return data.data;
    } catch (error) {
      console.error("[ShiftService] END Error:", error);
      throw error;
    }
  }
};
