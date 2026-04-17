import { API_BASE_URL } from "../../../constants/api";

export const loginService = {
  login: async (username, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        const errorMessage = responseData?.meta?.message || "Login gagal dilakukan.";
        throw new Error(errorMessage);
      }
      
      return responseData.data;
    } catch (error) {
      console.error("Login Service Fetch Error:", error);
      
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error("Gagal terhubung ke server backend (Network Error).");
      }
      
      throw error;
    }
  }
};
