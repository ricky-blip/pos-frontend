import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { LoginPage, RegisPage, ResetPassPage } from "./features/auth"
import { CashierDashboardPage, SettingsPage, SalesReportPage } from "./features/cashier"
import { AdminDashboardPage, ReportsPage, MenuManagementPage, UserManagementPage } from "./features/admin"
import SplashScreen from "./features/splashscreen/SplashScreen"
import AuthLayout from "./shared/AuthLayout"
import { CashierLayout } from "./features/cashier/layouts"
import { AdminLayout } from "./features/admin/layouts"

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

        {/* Cashier Routes - With Header + Sidebar */}
        <Route element={<CashierLayout />}>
          <Route path="/dashboard" element={<CashierDashboardPage />} />
          <Route path="/dashboard/sales-report" element={<SalesReportPage />} />
          <Route path="/dashboard/settings" element={<SettingsPage />} />
        </Route>

        {/* Admin Routes - With Header + Sidebar */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/reports" element={<ReportsPage />} />
          <Route path="/admin/menus" element={<MenuManagementPage />} />
          <Route path="/admin/users" element={<UserManagementPage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
