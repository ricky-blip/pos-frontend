import { useState, useCallback } from "react";
import { menuService } from "../../shared/services/menu.service";

/**
 * Custom hook untuk mengelola operasi CRUD menu Admin
 */
export function useMenuAPI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [menus, setMenus] = useState([]);

  const fetchMenus = useCallback(async (categoryId = "all", search = "") => {
    setLoading(true);
    setError(null);
    try {
      const data = await menuService.getAll(categoryId, search);
      setMenus(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const addMenu = useCallback(async (menuData) => {
    setLoading(true);
    setError(null);
    try {
      const newMenu = await menuService.create(menuData);
      setMenus((prev) => [...prev, newMenu]);
      return newMenu;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateMenu = useCallback(async (id, menuData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedMenu = await menuService.update(id, menuData);
      setMenus((prev) => prev.map((m) => (m.id === id ? updatedMenu : m)));
      return updatedMenu;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteMenu = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await menuService.delete(id);
      setMenus((prev) => prev.filter((m) => m.id !== id));
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
