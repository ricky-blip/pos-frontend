import { useState, useEffect, useCallback } from "react";
import { menuService } from "../../shared/services/menu.service";
import { categoryService } from "../../shared/services/category.service";
import useToastStore from "../../../stores/useToastStore";

export function useCashierCatalog() {
  const showToast = useToastStore((s) => s.showToast);
  
  const [categories, setCategories] = useState([{ id: "all", label: "All Menu" }]);
  const [menus, setMenus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMenus = useCallback(async (categoryId = "all", search = "") => {
    setIsLoading(true);
    try {
      const mns = await menuService.getAll(categoryId, search);
      setMenus(mns);
      return mns;
    } catch (err) {
      showToast(err.message || "Gagal memuat menu", "error");
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  const fetchCatalog = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const cats = await categoryService.getAll();
      setCategories([{ id: "all", label: "All Menu" }, ...cats]);
      await fetchMenus("all");
    } catch (err) {
      setError(err.message);
      showToast(err.message || "Gagal memuat data katalog", "error");
    } finally {
      setIsLoading(false);
    }
  }, [showToast, fetchMenus]);

  useEffect(() => {
    fetchCatalog();
  }, [fetchCatalog]);

  return {
    categories,
    menus,
    isLoading,
    error,
    fetchMenus,
    refetch: fetchCatalog
  };
}
