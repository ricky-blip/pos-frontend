import { useState } from "react";
import TransactionDetailModal from "../components/TransactionDetailModal";
import useToastStore from "../../../stores/useToastStore";

/**
 * SalesReportPage - Halaman laporan penjualan untuk admin
 * Fitur:
 * - Filter tanggal (Start, Finish)
 * - Filter Category dan Order Type
 * - Tabel data transaksi dengan pagination
 * - Export Excel/PDF
 * - Transaction detail modal
 */
export default function SalesReportPage() {
  const showToast = useToastStore((s) => s.showToast);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    category: "",
    orderType: "",
  });
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Mock data
  const mockTransactions = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    orderNumber: "ORDR#1234567890",
    orderDate: "2024-09-18T12:30:00",
    orderType: i % 3 === 0 ? "Take Away" : "Dine-in",
    category: "Foods",
    customerName: "Anisa",
    items: [
      {
        name: "Gado-gado Spesial",
        quantity: 1,
        price: 20000,
      },
    ],
    subTotal: 20000,
    tax: 5000,
    total: 25000,
    paid: 50000,
    change: 25000,
  }));

  const transactions = mockTransactions;
  const totalPages = Math.ceil(transactions.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentTransactions = transactions.slice(startIndex, endIndex);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    showToast("Searching transactions...", "success");
  };

  const handleViewDetail = (transaction) => {
    setSelectedTransaction(transaction);
    setShowDetailModal(true);
  };

  const handleCloseDetail = () => {
    setShowDetailModal(false);
    setSelectedTransaction(null);
  };

  const handleExportExcel = () => {
    showToast("Exporting to Excel...", "success");
    setShowExportMenu(false);
  };

  const handleExportPDF = () => {
    showToast("Exporting to PDF...", "success");
    setShowExportMenu(false);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex w-full h-full flex-col">
      {/* Transaction Detail Modal */}
      <TransactionDetailModal
        isOpen={showDetailModal}
        onClose={handleCloseDetail}
        transaction={selectedTransaction}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold text-[#111827]">Sales Report</h1>
        <p className="text-sm text-[#6b7280]">Today, {getCurrentDate()}</p>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow-sm p-5 mb-5">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-1">
              Start
            </label>
            <div className="relative">
              <input
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280] pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          {/* Finish Date */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-1">
              Finish
            </label>
            <div className="relative">
              <input
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280] pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-1">
              Category
            </label>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select category</option>
              <option value="food">Foods</option>
              <option value="beverage">Beverages</option>
              <option value="dessert">Dessert</option>
            </select>
          </div>

          {/* Order Type */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-1">
              Order Type
            </label>
            <select
              name="orderType"
              value={filters.orderType}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select order type</option>
              <option value="dine-in">Dine-in</option>
              <option value="take-away">Take Away</option>
            </select>
          </div>

          {/* Search & Export Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleSearch}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="border border-[#e5e7eb] text-[#6b7280] px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
              </button>

              {/* Export Dropdown */}
              {showExportMenu && (
                <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-lg shadow-lg border border-[#e5e7eb] overflow-hidden z-10">
                  <button
                    onClick={handleExportExcel}
                    className="w-full text-left px-4 py-2 text-sm text-[#111827] hover:bg-gray-50 transition-colors"
                  >
                    Export Excel
                  </button>
                  <button
                    onClick={handleExportPDF}
                    className="w-full text-left px-4 py-2 text-sm text-[#111827] hover:bg-gray-50 transition-colors"
                  >
                    Export PDF
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-sm flex-1 flex flex-col overflow-hidden">
        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold text-[#111827] uppercase tracking-wider">
                  No Order
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-[#111827] uppercase tracking-wider">
                  Order Date
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-[#111827] uppercase tracking-wider">
                  Order Type
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-[#111827] uppercase tracking-wider">
                  Category
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-[#111827] uppercase tracking-wider">
                  Customer Name
                </th>
                <th className="px-5 py-3 text-center text-xs font-semibold text-[#111827] uppercase tracking-wider">
                  Detail
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              {currentTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 text-sm text-[#111827] font-medium">
                    {transaction.orderNumber}
                  </td>
                  <td className="px-5 py-4 text-sm text-[#111827]">
                    {formatDate(transaction.orderDate)}
                  </td>
                  <td className="px-5 py-4 text-sm text-[#111827]">
                    {transaction.orderType}
                  </td>
                  <td className="px-5 py-4 text-sm text-[#111827]">
                    {transaction.category}
                  </td>
                  <td className="px-5 py-4 text-sm text-[#111827]">
                    {transaction.customerName}
                  </td>
                  <td className="px-5 py-4 text-center">
                    <button
                      onClick={() => handleViewDetail(transaction)}
                      className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center justify-center"
                      aria-label="View detail"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-[#e5e7eb] px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#6b7280]">Show:</span>
            <select
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-[#e5e7eb] rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span className="text-sm text-[#6b7280]">Entries</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-lg text-sm font-medium border border-[#e5e7eb] text-[#6b7280] hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &lt;
            </button>
            
            {pageNumbers.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "border border-[#e5e7eb] text-[#6b7280] hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-lg text-sm font-medium border border-[#e5e7eb] text-[#6b7280] hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
