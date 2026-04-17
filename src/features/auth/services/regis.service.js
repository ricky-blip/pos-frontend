import { API_BASE_URL } from "../../../constants/api";

export const regisService = {
  register: async (username, email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        const errorMessage = responseData?.meta?.message || "Registrasi gagal dilakukan.";
        throw new Error(errorMessage);
      }
      
      return responseData.data || responseData;
    } catch (error) {
      console.error("Register Service Fetch Error:", error);
      
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error("Gagal terhubung ke server backend (Network Error).");
      }
      
      throw error;
    }
  }
};
