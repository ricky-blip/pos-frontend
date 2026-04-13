import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../shared/AuthContext";

/**
 * ProtectedRoute - Wrapper component for protected routes
 * @param {string} requiredRole - Role required to access the route ("admin" or "cashier")
 * @param {string} redirectPath - Path to redirect if not authenticated (default: "/login")
 */
export default function ProtectedRoute({ requiredRole, redirectPath = "/login" }) {
  const { isAuthenticated, user } = useAuth();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  // If role doesn't match, redirect to appropriate dashboard
  if (requiredRole && user?.role !== requiredRole) {
    const defaultPath = user?.role === "admin" ? "/admin/dashboard" : "/dashboard";
    return <Navigate to={defaultPath} replace />;
  }

  // If authenticated and role matches, render child routes
  return <Outlet />;
}
