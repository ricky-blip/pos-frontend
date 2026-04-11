import { useState } from "react";
import { Outlet } from "react-router-dom";
import CashierHeader from "../components/shared/CashierHeader";
import CashierSidebar from "../components/shared/CashierSidebar";
import OrderArchiveModal from "../components/shared/OrderArchiveModal";

/**
 * CashierLayout - Layout untuk semua halaman cashier
 * - Full-height sidebar + Header + Content
 * - Sidebar goes full height, header is to the right of sidebar
 */
export default function CashierLayout() {
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);

  const handleOpenArchive = () => {
    setIsArchiveModalOpen(true);
  };

  const handleCloseArchive = () => {
    setIsArchiveModalOpen(false);
  };

  return (
    <div
      className="relative flex h-dvh bg-[#f3f5f9]"
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      {/* Full-height Sidebar */}
      <CashierSidebar />

      {/* Right Section: Header + Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header - to the right of sidebar */}
        <CashierHeader onOrderArchive={handleOpenArchive} />

        {/* Main Content Area */}
        <main className="flex flex-1 overflow-auto p-5">
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
