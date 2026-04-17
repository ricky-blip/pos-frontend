import { API_BASE_URL } from "../../../constants/api";
import useAuthStore from "../../../stores/useAuthStore";

export const categoryService = {
  getAll: async () => {
    try {
      const token = useAuthStore.getState().user?.token;
      const response = await fetch(`${API_BASE_URL}/categories`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data?.meta?.message || "Failed to fetch categories");
      }
      
      // Adapt backend structure to frontend expectation
      // Category model has { id, label, slug }
      // Frontend expects { id: slug, label: label, dbId: id }
      return data.data.map(cat => ({
        id: cat.slug, // mapping target
        dbId: cat.id,
        label: cat.label
      }));
    } catch (error) {
      console.error("[CategoryService] GET Error:", error);
      throw error;
    }
  }
};
