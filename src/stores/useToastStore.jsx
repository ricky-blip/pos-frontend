import { create } from "zustand";

/**
 * useToastStore - Zustand store untuk toast notification
 * Mengelola state toast (message, type) secara global
 * Bisa dipanggil dari komponen mana saja tanpa Provider
 */
const useToastStore = create((set) => ({
  // State: toast notification (null = tidak ada toast)
  toast: null,

  // Action: tampilkan toast baru
  showToast: (message, type = "success") => {
    set({ toast: { message, type, id: Date.now() } });
  },

  // Action: sembunyikan toast
  hideToast: () => {
    set({ toast: null });
  },
}));

export default useToastStore;
