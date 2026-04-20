import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { LoginPage, RegisPage, ResetPassPage } from "./features/auth"
import { CashierDashboardPage, SettingsPage as CashierSettingsPage, SalesReportPage as CashierSalesReportPage } from "./features/cashier"
import { AdminDashboardPage, SalesReportPage as AdminSalesReportPage, MenuManagementPage, ActivityLogsPage, SettingsPage as AdminSettingsPage, UserManagementPage } from "./features/admin"
import SplashScreen from "./features/splashscreen/SplashScreen"
import AuthLayout from "./shared/AuthLayout"
import { CashierLayout } from "./features/cashier/layouts"
import { AdminLayout } from "./features/admin/layouts"
import ProtectedRoute from "./shared/ProtectedRoute"
import ToastNotification from "./shared/ToastNotification"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Splash Screen */}
        <Route path="/" element={<SplashScreen />} />

        {/* Auth Routes - No Header/Sidebar */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisPage />} />
          <Route path="/reset-password" element={<ResetPassPage />} />
        </Route>

        {/* Cashier Routes - Protected, requires cashier role */}
        <Route element={<ProtectedRoute requiredRole="cashier" />}>
          <Route element={<CashierLayout />}>
            <Route path="/dashboard" element={<CashierDashboardPage />} />
            <Route path="/dashboard/sales-report" element={<CashierSalesReportPage />} />
            <Route path="/dashboard/settings" element={<CashierSettingsPage />} />
          </Route>
        </Route>

        {/* Admin Routes - Protected, requires admin role */}
        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/catalog" element={<MenuManagementPage />} />
            <Route path="/admin/sales-report" element={<AdminSalesReportPage />} />
            <Route path="/admin/users" element={<UserManagementPage />} />
            <Route path="/admin/logs" element={<ActivityLogsPage />} />
            <Route path="/admin/settings" element={<AdminSettingsPage />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastNotification />
    </BrowserRouter>
  )
}

export default App