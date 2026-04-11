import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import CashierHeader from "../../cashier/components/shared/CashierHeader";
import CashierSidebar from "../../cashier/components/shared/CashierSidebar";
import OrderArchiveModal from "../../cashier/components/shared/OrderArchiveModal";

/**
 * AdminLayout - Layout untuk semua halaman admin
 * - Similar structure to CashierLayout
 * - Different sidebar items for admin features
 * - Shared Header dan modals
 */
export default function AdminLayout() {
  const location = useLocation();
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);

  // Determine active sidebar item based on current route
  const getActiveItem = () => {
    const path = location.pathname;
    if (path.includes("/reports")) return "reports";
    if (path.includes("/menus")) return "menus";
    if (path.includes("/users")) return "users";
    return "dashboard"; // default to dashboard
  };

  const handleOpenArchive = () => {
    setIsArchiveModalOpen(true);
  };

  const handleCloseArchive = () => {
    setIsArchiveModalOpen(false);
  };

  return (
    <div
      className="relative min-h-dvh bg-[#f3f5f9]"
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      {/* Header - Shared across all admin pages */}
      <CashierHeader onOrderArchive={handleOpenArchive} />

      {/* Main Layout: Sidebar + Content */}
      <div className="flex min-h-[calc(100dvh-80px)]">
        {/* Sidebar - Admin Navigation */}
        <CashierSidebar activeItem={getActiveItem()} />

        {/* Main Content Area - Outlet renders child routes */}
        <main className="flex min-w-0 flex-1 flex-col p-4 lg:p-5">
          <Outlet />
        </main>
      </div>

      {/* Shared Modals */}
      <OrderArchiveModal
        isOpen={isArchiveModalOpen}
        onClose={handleCloseArchive}
      />
    </div>
  );
}
