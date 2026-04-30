import { API_BASE_URL } from "../../../constants/api";
import useAuthStore from "../../../stores/useAuthStore";

export const reportService = {
  /**
   * Get Sales Report Data (Summary + List)
   * @param {Object} filters - { startDate, endDate, categoryId, userId, page, limit }
   */
  getSalesReport: async (filters = {}) => {
    try {
      const token = useAuthStore.getState().token;
      
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      const response = await fetch(`${API_BASE_URL}/reports/sales?${params.toString()}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data?.meta?.message || "Failed to fetch report");
      }
      
      return data.data;
    } catch (error) {
      console.error("[ReportService] Error:", error);
      throw error;
    }
  },

  /**
   * Export Sales Report as PDF
   */
  exportPdf: async (filters = {}) => {
    try {
      const token = useAuthStore.getState().token;
      
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      const response = await fetch(`${API_BASE_URL}/reports/export/pdf?${params.toString()}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.meta?.message || "Failed to export report");
      }
      
      // Blob response
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `sales_report_${new Date().getTime()}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (error) {
      console.error("[ReportService Export PDF] Error:", error);
      throw error;
    }
  },

  /**
   * Get Dashboard Data (Summary + Trend)
   */
  getDashboardStats: async (filters = {}) => {
    try {
      const token = useAuthStore.getState().token;
      const params = new URLSearchParams(filters);
      
      const response = await fetch(`${API_BASE_URL}/reports/dashboard?${params.toString()}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const res = await response.json();
      if (!response.ok) throw new Error(res.meta?.message || "Gagal mengambil data dashboard");
      return res.data;
    } catch (error) {
      console.error("[DashboardService] Error:", error);
      throw error;
    }
  },

  /**
   * Get Top Products by Category
   */
  getTopSellingItems: async (categoryId) => {
    try {
      const token = useAuthStore.getState().token;
      const response = await fetch(`${API_BASE_URL}/reports/top-selling?categoryId=${categoryId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const res = await response.json();
      if (!response.ok) throw new Error(res.meta?.message || "Gagal mengambil produk terlaris");
      return res.data;
    } catch (error) {
      console.error("[TopSellingService] Error:", error);
      throw error;
    }
  },

  /**
   * Get Stock Predictions
   */
  getStockPredictions: async () => {
    try {
      const token = useAuthStore.getState().token;
      const response = await fetch(`${API_BASE_URL}/reports/predictions`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const res = await response.json();
      if (!response.ok) throw new Error(res.meta?.message || "Gagal mengambil prediksi stok");
      return res.data;
    } catch (error) {
      console.error("[PredictionService] Error:", error);
      throw error;
    }
  }
};

