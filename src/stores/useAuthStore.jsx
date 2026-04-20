import { create } from "zustand";

/**
 * useAuthStore - Zustand store untuk authentication state
 * Mengelola user data, login, logout, dan role checking
 * Data user disimpan di localStorage agar persist setelah refresh
 */
const useAuthStore = create((set, get) => ({
  // State: load dari localStorage saat init
  user: JSON.parse(localStorage.getItem("pos-user")) || null,
  token: localStorage.getItem("pos-token") || null,

  // Action: login - simpan user & token
  login: (userData, token) => {
    localStorage.setItem("pos-user", JSON.stringify(userData));
    if (token) localStorage.setItem("pos-token", token);
    set({ user: userData, token: token || get().token });
  },

  // Action: logout - hapus semua
  logout: () => {
    localStorage.removeItem("pos-user");
    localStorage.removeItem("pos-token");
    set({ user: null, token: null });
  },

  // Action: update profil user (username/email)
  setUser: (updatedUser) => {
    localStorage.setItem("pos-user", JSON.stringify(updatedUser));
    set({ user: updatedUser });
  },
}));

export default useAuthStore;
