import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";

/**
 * AdminLayout - Layout untuk semua halaman admin
 * - Similar structure to CashierLayout
 * - Full-height sidebar + Header + Content
 * - Sidebar goes full height, header is to the right of sidebar
 */
export default function AdminLayout() {
  return (
    <div
      className="relative flex h-dvh bg-[#f3f5f9]"
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      {/* Full-height Sidebar */}
      <AdminSidebar />

      {/* Right Section: Header + Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header - to the right of sidebar */}
        <AdminHeader />

        {/* Main Content Area */}
        <main className="flex flex-1 overflow-auto p-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
