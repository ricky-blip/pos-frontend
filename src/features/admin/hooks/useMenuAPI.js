import { useState, useCallback } from "react";

/**
 * Custom hook untuk mengelola operasi CRUD menu
 * TODO: Replace mock data with actual API calls
 */
export function useMenuAPI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock data - akan diganti dengan API call
  const [menus, setMenus] = useState([
    {
      id: 1,
      name: "Gado-gado Special",
      description: "Vegetables, egg, tempe, tofu, ketupat, peanut sauce, and kerupuk",
      price: 20000,
      category: "food",
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400",
    },
    {
      id: 2,
      name: "Nasi Goreng Special",
      description: "Fried rice with chicken, egg, vegetables, and kerupuk",
      price: 25000,
      category: "food",
      image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400",
    },
    {
      id: 3,
      name: "Es Teh Manis",
      description: "Sweet iced tea",
      price: 5000,
      category: "beverage",
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400",
    },
    {
      id: 4,
      name: "Es Jeruk Segar",
      description: "Fresh orange juice with ice",
      price: 8000,
      category: "beverage",
      image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400",
    },
    {
      id: 5,
      name: "Pisang Goreng",
      description: "Fried banana with chocolate sauce",
      price: 10000,
      category: "dessert",
      image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400",
    },
    {
      id: 6,
      name: "Es Krim Coklat",
      description: "Chocolate ice cream with toppings",
      price: 15000,
      category: "dessert",
      image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400",
    },
  ]);

  /**
   * Fetch semua menu (mock implementation)
   * TODO: Replace with actual API call
   */
  const fetchMenus = useCallback(async (category = "all") => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      if (category === "all") {
        return menus;
      }
      return menus.filter((menu) => menu.category === category);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [menus]);

  /**
   * Tambah menu baru (mock implementation)
   * TODO: Replace with actual API call
   */
  const addMenu = useCallback(async (menuData) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const newMenu = {
        id: menus.length + 1,
        ...menuData,
        image: menuData.imagePreview || "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400",
      };
      
      setMenus((prev) => [...prev, newMenu]);
      return newMenu;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [menus]);

  /**
   * Update menu (mock implementation)
   * TODO: Replace with actual API call
   */
  const updateMenu = useCallback(async (id, menuData) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      setMenus((prev) =>
        prev.map((menu) =>
          menu.id === id
            ? {
                ...menu,
                ...menuData,
                image: menuData.imagePreview || menu.image,
              }
            : menu
        )
      );
      
      return { id, ...menuData };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Hapus menu (mock implementation)
   * TODO: Replace with actual API call
   */
  const deleteMenu = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      setMenus((prev) => prev.filter((menu) => menu.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    menus,
    loading,
    error,
    fetchMenus,
    addMenu,
    updateMenu,
    deleteMenu,
  };
}
