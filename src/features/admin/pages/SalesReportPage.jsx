import { useState, useEffect, useCallback } from "react";
import TransactionDetailModal from "../components/TransactionDetailModal";
import ReportSummaryCards from "../../shared/components/ReportSummaryCards";
import { reportService } from "../../shared/services/report.service";
import useToastStore from "../../../stores/useToastStore";

/**
 * SalesReportPage - Halaman laporan penjualan untuk admin
 * Fitur:
 * - Summary Statistics Cards (Totals, Categories)
 * - Filter tanggal (Start, Finish)
 * - Tabel data transaksi asli dengan pagination
 */
export default function SalesReportPage() {
  const showToast = useToastStore((s) => s.showToast);
  
  // Helper to get Today's date in YYYY-MM-DD
  const getTodayStr = () => new Date().toISOString().split("T")[0];

  const [filters, setFilters] = useState({
    startDate: getTodayStr(),
    endDate: getTodayStr(),
    categoryId: "all",
  });
  
  const [reportData, setReportData] = useState({
    summary: null,
    transactions: [],
    pagination: { totalPages: 1, total: 0 }
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const fetchReport = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Convert simple YYYY-MM-DD to ISO timestamps for backend
      const start = new Date(filters.startDate);
      start.setHours(0, 0, 0, 0);
      
      const end = new Date(filters.endDate);
      end.setHours(23, 59, 59, 999);

      const params = {
        startDate: start.toISOString(),
        endDate: end.toISOString(),
        categoryId: filters.categoryId !== "all" ? filters.categoryId : null,
        page: currentPage,
        limit: entriesPerPage
      };

      const result = await reportService.getSalesReport(params);
      setReportData(result);
    } catch (error) {
      showToast(error.message || "Gagal memuat laporan", "error");
    } finally {
      setIsLoading(false);
    }
  }, [filters, currentPage, entriesPerPage, showToast]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleSearch = () => {
    fetchReport();
  };

  const handleViewDetail = (transaction) => {
    setSelectedTransaction(transaction);
    setShowDetailModal(true);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }) + ":00";
  };

  const getCurrentDateDisplay = () => {
    const date = new Date();
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="flex w-full h-full flex-col">
      <TransactionDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        transaction={selectedTransaction}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold text-[#111827]">Sales Report</h1>
        <p className="text-sm text-[#6b7280]">Today, {getCurrentDateDisplay()}</p>
      </div>

      {/* Summary Cards */}
      <ReportSummaryCards summary={reportData.summary} isLoading={isLoading} />

      {/* Filter Section */}
      <div className="bg-white rounded-[20px] shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Start</label>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Finish</label>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Category</label>
            <select
              name="categoryId"
              value={filters.categoryId}
              onChange={handleFilterChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
            >
              <option value="all">All Category</option>
              <option value="1">Foods</option>
              <option value="2">Beverages</option>
              <option value="3">Desserts</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Order Type</label>
            <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none">
              <option>All Types</option>
              <option>Dine-in</option>
              <option>Take Away</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSearch}
              className="flex-1 bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95"
            >
              Search
            </button>
            <button className="p-2.5 border border-gray-200 rounded-xl text-gray-400 hover:bg-gray-50 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[26px] shadow-sm flex-1 flex flex-col overflow-hidden border border-gray-50">
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-[13px] font-bold text-gray-400 uppercase tracking-wider">No Order</th>
                <th className="px-6 py-4 text-[13px] font-bold text-gray-400 uppercase tracking-wider">Order Date</th>
                <th className="px-6 py-4 text-[13px] font-bold text-gray-400 uppercase tracking-wider">Order Type</th>
                <th className="px-6 py-4 text-[13px] font-bold text-gray-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-[13px] font-bold text-gray-400 uppercase tracking-wider">Customer Name</th>
                <th className="px-6 py-4 text-[13px] font-bold text-gray-400 uppercase tracking-wider text-center">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan="6" className="px-6 py-5 h-12 bg-gray-50/30"></td>
                  </tr>
                ))
              ) : reportData.transactions.length > 0 ? (
                reportData.transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-blue-50/20 transition-colors group">
                    <td className="px-6 py-5 text-sm font-semibold text-gray-900">{transaction.invoiceNumber}</td>
                    <td className="px-6 py-5 text-sm text-gray-600">{formatDate(transaction.createdAt)}</td>
                    <td className="px-6 py-5 text-sm text-gray-600">Dine-in</td>
                    <td className="px-6 py-5 text-sm text-gray-600">Foods</td>
                    <td className="px-6 py-5 text-sm font-medium text-gray-700">{transaction.customerName || "Guest"}</td>
                    <td className="px-6 py-5 text-center">
                      <button
                        onClick={() => handleViewDetail(transaction)}
                        className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg transition-all"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-20 text-center text-gray-400">
                    Tidak ada data transaksi untuk periode ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Sidebar-style footer */}
        <div className="border-t border-gray-50 px-6 py-4 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400 font-medium">Show:</span>
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-sm font-semibold text-gray-700 focus:outline-none"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span className="text-sm text-gray-400 font-medium">Entries</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="p-2 rounded-xl border border-gray-100 text-gray-400 disabled:opacity-30 hover:bg-gray-50 transition-all font-bold"
            >
              {"<"}
            </button>
            <span className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-bold shadow-md shadow-blue-200">
              {currentPage}
            </span>
            <button
              disabled={currentPage >= reportData.pagination.totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className="p-2 rounded-xl border border-gray-100 text-gray-400 disabled:opacity-30 hover:bg-gray-50 transition-all font-bold"
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

