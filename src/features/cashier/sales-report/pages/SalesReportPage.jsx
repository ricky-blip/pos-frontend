import { useState, useEffect, useCallback } from "react";
import TransactionDetailModal from "../components/TransactionDetailModal";
import ReportSummaryCards from "../../../shared/components/ReportSummaryCards";
import { reportService } from "../../../shared/services/report.service";
import useToastStore from "../../../../stores/useToastStore";

/**
 * SalesReportPage - Halaman laporan penjualan untuk kasir
 * Menampilkan data pibadi kasir yang sedang login.
 */
export default function SalesReportPage() {
  const showToast = useToastStore((s) => s.showToast);
  
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
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const fetchReport = useCallback(async () => {
    try {
      setIsLoading(true);
      
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
    setCurrentPage(1);
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
    <div className="w-full">
      <TransactionDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        transaction={selectedTransaction}
      />

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#111827]">Sales Report</h1>
        <p className="text-sm text-[#6b7280]">Today, {getCurrentDateDisplay()}</p>
      </div>

      <ReportSummaryCards summary={reportData.summary} isLoading={isLoading} />

      <div className="rounded-xl border border-[#edf1f7] bg-white p-4 mb-6 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5 items-end">
          <div>
            <label className="mb-2 block text-xs font-bold text-gray-400 uppercase">Start</label>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              className="h-11 w-full rounded-lg border border-[#e6ebf3] px-4 text-sm focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold text-gray-400 uppercase">Finish</label>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              className="h-11 w-full rounded-lg border border-[#e6ebf3] px-4 text-sm focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold text-gray-400 uppercase">Category</label>
            <select
              name="categoryId"
              value={filters.categoryId}
              onChange={handleFilterChange}
              className="h-11 w-full rounded-lg border border-[#e6ebf3] px-4 text-sm bg-white"
            >
              <option value="all">All Category</option>
              <option value="1">Foods</option>
              <option value="2">Beverages</option>
              <option value="3">Desserts</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold text-gray-400 uppercase">Order Type</label>
            <select className="h-11 w-full rounded-lg border border-[#e6ebf3] px-4 text-sm bg-white">
              <option>All Types</option>
              <option>Dine-in</option>
              <option>Take Away</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => fetchReport()}
              className="h-11 flex-1 rounded-lg bg-blue-600 text-sm font-bold text-white hover:bg-blue-700"
            >
              Search
            </button>
            <button className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-200 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-[#edf1f7] bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#f9fafb] border-b border-[#edf1f7]">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">No Order</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Order Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Order Type</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#edf1f7]">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan="6" className="px-6 py-5 bg-gray-50/50"></td>
                  </tr>
                ))
              ) : reportData.transactions.length > 0 ? (
                reportData.transactions.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50 group">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{t.invoiceNumber}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{formatDate(t.createdAt)}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Dine-in</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Foods</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">{t.customerName || "Guest"}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => { setSelectedTransaction(t); setShowDetailModal(true); }}
                        className="text-blue-500 hover:text-blue-700"
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
                  <td colSpan="6" className="px-6 py-10 text-center text-gray-400 text-sm italic">
                    Belum ada transaksi kamu untuk periode ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-[#edf1f7] px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">Show:</span>
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="rounded-lg border border-[#e6ebf3] px-2 py-1 text-sm bg-gray-50"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span className="text-sm text-gray-400">Entries</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="p-2 rounded-lg border border-gray-100 disabled:opacity-30"
            >
              {"<"}
            </button>
            <span className="px-4 py-1 rounded-lg bg-blue-600 text-white text-sm font-bold">
              {currentPage}
            </span>
            <button
              disabled={currentPage >= reportData.pagination.totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className="p-2 rounded-lg border border-gray-100 disabled:opacity-30"
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

