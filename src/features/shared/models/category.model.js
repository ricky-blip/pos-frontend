import { useState, useEffect, useCallback } from "react";
import { categoryService } from "../services/category.service";

/**
 * useCategoryModel - Custom hook shared to handle category listing logic
 */
export function useCategoryModel() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await categoryService.getAll();
      setCategories(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    isLoading,
    error,
    refetch: fetchCategories,
  };
}
