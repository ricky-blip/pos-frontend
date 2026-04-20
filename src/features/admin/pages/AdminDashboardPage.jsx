import { useState, useEffect, useCallback } from "react";
import StatCard from "../components/StatCard";
import CategoryPopup from "../components/CategoryPopup";
import ReportSummaryCards from "../../shared/components/ReportSummaryCards";
import DashboardChart from "../components/DashboardChart";
import { reportService } from "../../shared/services/report.service";
import useToastStore from "../../../stores/useToastStore";

/**
 * AdminDashboardPage - Main dashboard page for admin role
 */
export default function AdminDashboardPage() {
  const showToast = useToastStore((s) => s.showToast);
  
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    summary: null,
    trend: []
  });

  const [activeCategory, setActiveCategory] = useState(null);
  const [categoryItems, setCategoryItems] = useState([]);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);

  const fetchDashboard = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await reportService.getDashboardStats();
      setDashboardData(data);
    } catch (error) {
      showToast(error.message || "Gagal memuat dashboard", "error");
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const handleCategoryClick = async (title, categoryId) => {
    try {
      setActiveCategory(title);
      setIsCategoryLoading(true);
      setCategoryItems([]); // Reset items
      
      const items = await reportService.getTopSellingItems(categoryId);
      setCategoryItems(items);
    } catch (error) {
      showToast("Gagal memuat produk terlaris", "error");
    } finally {
      setIsCategoryLoading(false);
    }
  };

  const getTodayStr = () => {
    return new Date().toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-1 flex-col pb-10">
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#111827]">Dashboard</h1>
        <p className="text-sm text-[#6b7280]">Today, {getTodayStr()}</p>
      </div>

      {/* Stats Cards (Reusing shared summary logic) */}
      <div className="mb-8 overflow-x-auto pb-2">
        <div className="flex gap-4 min-w-[1000px]">
          <div className="flex-1">
             <StatCard
              title="Total Orders"
              value={dashboardData.summary?.totalOrders || 0}
              icon={<OrdersIcon />}
              isLoading={isLoading}
            />
          </div>
          <div className="flex-1">
            <StatCard
              title="Total Omzet"
              value={`Rp ${(dashboardData.summary?.totalOmzet || 0).toLocaleString("id-ID")}`}
              icon={<RevenueIcon />}
              isLoading={isLoading}
            />
          </div>
          <div className="flex-1">
            <StatCard
              title="All Menu Orders"
              value={dashboardData.summary?.totalItems || 0}
              icon={<MenuOrdersIcon />}
              isLoading={isLoading}
            />
          </div>
          <div className="flex-1">
            <StatCard
              title="Foods"
              value={dashboardData.summary?.categoryBreakdown?.foods || 0}
              icon={<FoodIcon />}
              clickable
              onClick={() => handleCategoryClick("Foods", 1)}
              isLoading={isLoading}
            />
          </div>
          <div className="flex-1">
            <StatCard
              title="Beverages"
              value={dashboardData.summary?.categoryBreakdown?.beverages || 0}
              icon={<BeverageIcon />}
              clickable
              onClick={() => handleCategoryClick("Beverages", 2)}
              isLoading={isLoading}
            />
          </div>
          <div className="flex-1">
            <StatCard
              title="Desserts"
              value={dashboardData.summary?.categoryBreakdown?.desserts || 0}
              icon={<DessertIcon />}
              clickable
              onClick={() => handleCategoryClick("Desserts", 3)}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Revenue Chart Section */}
      <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#111827]">Total Omzet</h2>
            <p className="text-sm text-gray-400 mt-1">Tren penjualan 30 hari terakhir</p>
          </div>
          
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100">
              Download Report
            </button>
          </div>
        </div>

        <div className="mt-4">
          <DashboardChart data={dashboardData.trend} isLoading={isLoading} />
        </div>
      </div>

      {/* Category Popups */}
      <CategoryPopup
        isOpen={!!activeCategory}
        onClose={() => setActiveCategory(null)}
        title={activeCategory}
        items={categoryItems}
        isLoading={isCategoryLoading}
        searchPlaceholder={`Cari menu di ${activeCategory}...`}
      />
    </div>
  );
}

// Icon Components (kept as in previous version but can be moved to separate file)
function OrdersIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5z" />
    </svg>
  );
}
function RevenueIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    </svg>
  );
}
function MenuOrdersIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  );
}
function FoodIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 010 8h-1" /><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  );
}
function BeverageIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" /><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  );
}
function DessertIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a4 4 0 0 0-4 4v2h8V6a4 4 0 0 0-4-4z" /><path d="M4 8v10a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V8H4z" /><circle cx="12" cy="14" r="2" />
    </svg>
  );
}

