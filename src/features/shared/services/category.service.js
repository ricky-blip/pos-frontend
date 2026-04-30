import { API_BASE_URL } from "../../../constants/api";
import useAuthStore from "../../../stores/useAuthStore";

export const categoryService = {
  getAll: async () => {
    try {
      const token = useAuthStore.getState().token;
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
  },

  create: async (data) => {
    try {
      const token = useAuthStore.getState().token;
      const response = await fetch(`${API_BASE_URL}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.meta?.message || "Failed to create category");
      }
      return result.data;
    } catch (error) {
      console.error("[CategoryService] CREATE Error:", error);
      throw error;
    }
  },

  update: async (id, data) => {
    try {
      const token = useAuthStore.getState().token;
      const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.meta?.message || "Failed to update category");
      }
      return result.data;
    } catch (error) {
      console.error("[CategoryService] UPDATE Error:", error);
      throw error;
    }
  },

  remove: async (id) => {
    try {
      const token = useAuthStore.getState().token;
      const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.meta?.message || "Failed to delete category");
      }
      return result.data;
    } catch (error) {
      console.error("[CategoryService] DELETE Error:", error);
      throw error;
    }
  }
};
