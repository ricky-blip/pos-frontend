import { API_BASE_URL } from "../../../constants/api";
import useAuthStore from "../../../stores/useAuthStore.jsx";

const transactionService = {
  /**
   * Create a new transaction (Checkout)
   * @param {Object} transactionData - { items, paymentMethod, customerName, totalDiscount }
   */
  async createTransaction(transactionData) {
    const token = useAuthStore.getState().token;
    
    const response = await fetch(`${API_BASE_URL}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(transactionData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to process transaction");
    }

    return result;
  },

  /**
   * Get transaction history
   */
  async getTransactionHistory() {
    const token = useAuthStore.getState().token;

    const response = await fetch(`${API_BASE_URL}/transactions`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch transactions");
    }

    return result.data;
  },

  /**
   * Get specific transaction details
   */
  async getTransactionById(id) {
    const token = useAuthStore.getState().token;

    const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch transaction details");
    }

    return result.data;
  },
};

export default transactionService;
