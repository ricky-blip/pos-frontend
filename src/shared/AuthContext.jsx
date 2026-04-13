import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

/**
 * AuthProvider - Provides authentication state and methods
 * Manages user role (admin/cashier) and authentication status
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Load user from localStorage on mount
    const savedUser = localStorage.getItem("pos-user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("pos-user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("pos-user");
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";
  const isCashier = user?.role === "cashier";

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        isAdmin,
        isCashier,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
