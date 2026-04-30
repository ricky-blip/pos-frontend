import { API_BASE_URL } from "../../../constants/api";
import useAuthStore from "../../../stores/useAuthStore";

export const menuService = {
  getAll: async (categoryId = "", search = "") => {
    let params = new URLSearchParams();
    if (categoryId && categoryId !== "all") {
      params.append("categoryId", categoryId);
    }
    if (search) {
      params.append("search", search);
    }

    const queryString = params.toString();
    const url = `${API_BASE_URL}/menus${queryString ? `?${queryString}` : ""}`;

    try {
      // Small artificial delay to ensure skeleton is visible (especially on localhost)
      await new Promise(resolve => setTimeout(resolve, 800));

      const token = useAuthStore.getState().token;
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.meta?.message || "Failed to fetch menus");
      }

      // Adapt backend structure to what frontend expects 
      // where `category` is used as slug by frontend originally.
      // E.g. menu.category.slug -> menu.category
      return data.data.map(menu => ({
        ...menu,
        category: menu.category?.slug || menu.categoryId, // Fallback for frontend mapping
      }));
    } catch (error) {
      console.error("[MenuService] GET Error:", error);
      throw error;
    }
  },

  create: async (menuData) => {
    try {
      const token = useAuthStore.getState().token;
      const response = await fetch(`${API_BASE_URL}/menus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(menuData)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.meta?.message || "Failed to create menu");
      return data.data;
    } catch (error) {
      console.error("[MenuService] POST Error:", error);
      throw error;
    }
  },

  update: async (id, menuData) => {
    try {
      const token = useAuthStore.getState().token;
      const response = await fetch(`${API_BASE_URL}/menus/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(menuData)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.meta?.message || "Failed to update menu");
      return data.data;
    } catch (error) {
      console.error("[MenuService] PUT Error:", error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const token = useAuthStore.getState().token;
      const response = await fetch(`${API_BASE_URL}/menus/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.meta?.message || "Failed to delete menu");
      return true;
    } catch (error) {
      console.error("[MenuService] DELETE Error:", error);
      throw error;
    }
  },

  adjustStock: async (id, payload) => {
    try {
      const token = useAuthStore.getState().token;
      const response = await fetch(`${API_BASE_URL}/menus/${id}/adjust`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.meta?.message || "Failed to adjust stock");
      return data.data;
    } catch (error) {
      console.error("[MenuService] Adjust Stock Error:", error);
      throw error;
    }
  },

  getLowStock: async (threshold = 5) => {
    try {
      const token = useAuthStore.getState().token;
      const response = await fetch(`${API_BASE_URL}/menus/low-stock?threshold=${threshold}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.meta?.message || "Failed to fetch low stock");
      return data.data;
    } catch (error) {
      console.error("[MenuService] Low Stock Error:", error);
      throw error;
    }
  },

  getLogs: async (id = null) => {
    try {
      const token = useAuthStore.getState().token;
      const url = id ? `${API_BASE_URL}/menus/${id}/logs` : `${API_BASE_URL}/menus/logs`;
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.meta?.message || "Failed to fetch logs");
      return data.data;
    } catch (error) {
      console.error("[MenuService] Get Logs Error:", error);
      throw error;
    }
  }
};
