import { create } from "zustand";

/**
 * useAuthStore - Zustand store untuk authentication state
 * Mengelola user data, login, logout, dan role checking
 * Data user disimpan di localStorage agar persist setelah refresh
 */
const useAuthStore = create((set) => ({
  // State: load user dari localStorage saat inisialisasi
  user: JSON.parse(localStorage.getItem("pos-user")) || null,

  // Action: login - simpan user ke state & localStorage
  login: (userData) => {
    localStorage.setItem("pos-user", JSON.stringify(userData));
    set({ user: userData });
  },

  // Action: logout - hapus user dari state & localStorage
  logout: () => {
    localStorage.removeItem("pos-user");
    set({ user: null });
  },
}));

export default useAuthStore;
