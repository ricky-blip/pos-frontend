import { useState, useMemo } from "react";
import CategorySalesModal from "../components/CategorySalesModal";
import TransactionDetailModal from "../components/TransactionDetailModal";

// Icons
function FileIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ReceiptIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 14l-4-4 4-4M15 10l4 4-4 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M9 9h6M9 12h6M9 15h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function FoodIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BeverageIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M17 8h1a4 4 0 110 8h-1M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DessertIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2a4 4 0 00-4 4v2h8V6a4 4 0 00-4-4zM4 8v10a4 4 0 004 4h8a4 4 0 004-4V8H4zM12 16a2 2 0 100-4 2 2 0 000 4z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
      <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function formatPrice(value) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

// Mock data for sales report
const mockSalesData = [
  { id: "ORDR#1234567890", date: "Rabu, 18/09/2024 12:30:00", type: "Dine-in", category: "Foods", customer: "Anisa", total: 25000 },
  { id: "ORDR#1234567891", date: "Rabu, 18/09/2024 13:15:00", type: "Take Away", category: "Beverages", customer: "Budi", total: 18000 },
  { id: "ORDR#1234567892", date: "Rabu, 18/09/2024 14:00:00", type: "Dine-in", category: "Desserts", customer: "Citra", total: 24000 },
  { id: "ORDR#1234567893", date: "Rabu, 18/09/2024 14:45:00", type: "Take Away", category: "Foods", customer: "Dedi", total: 32000 },
  { id: "ORDR#1234567894", date: "Rabu, 18/09/2024 15:30:00", type: "Dine-in", category: "Beverages", customer: "Eka", total: 15000 },
  { id: "ORDR#1234567895", date: "Rabu, 18/09/2024 16:00:00", type: "Dine-in", category: "Foods", customer: "Fani", total: 28000 },
  { id: "ORDR#1234567896", date: "Rabu, 18/09/2024 16:30:00", type: "Take Away", category: "Desserts", customer: "Gita", total: 21000 },
  { id: "ORDR#1234567897", date: "Rabu, 18/09/2024 17:00:00", type: "Dine-in", category: "Foods", customer: "Hadi", total: 35000 },
  { id: "ORDR#1234567898", date: "Rabu, 18/09/2024 17:30:00", type: "Dine-in", category: "Beverages", customer: "Indah", total: 12000 },
  { id: "ORDR#1234567899", date: "Rabu, 18/09/2024 18:00:00", type: "Take Away", category: "Foods", customer: "Joko", total: 40000 },
];

const mockCategorySales = {
  foods: [
    { name: "Gado-gado Spesial", sales: 10 },
    { name: "Ketoprak", sales: 5 },
    { name: "Siomay", sales: 3 },
    { name: "Batagor", sales: 2 },
    { name: "Bakso", sales: 2 },
    { name: "Mie Ayam", sales: 2 },
    { name: "Soto Ayam", sales: 1 },
    { name: "Soto Sapi", sales: 0 },
  ],
  beverages: [
    { name: "Ice Tea", sales: 10 },
    { name: "Coffee", sales: 5 },
    { name: "Matcha Latte", sales: 3 },
    { name: "Milkshake", sales: 2 },
    { name: "Juice", sales: 2 },
    { name: "Ice Chocolate", sales: 2 },
    { name: "Soda", sales: 1 },
    { name: "Mineral Water", sales: 0 },
  ],
  desserts: [
    { name: "Ice Cream", sales: 10 },
    { name: "Smoothie", sales: 5 },
    { name: "Waffle", sales: 3 },
    { name: "Donut", sales: 2 },
    { name: "Tiramisu", sales: 2 },
    { name: "Brownies", sales: 2 },
    { name: "Pancake", sales: 1 },
    { name: "Pudding", sales: 0 },
  ],
};

export default function SalesReportPage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [orderTypeFilter, setOrderTypeFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  
  // Modal states
  const [activeCategoryModal, setActiveCategoryModal] = useState(null);
  const [transactionDetail, setTransactionDetail] = useState(null);
  const [showExportDropdown, setShowExportDropdown] = useState(false);

  const handleSearch = () => {
    setCurrentPage(1);
    // Future: Implement search with filters
    console.log("Searching with filters:", { startDate, endDate, categoryFilter, orderTypeFilter });
  };

  const handleExportExcel = () => {
    console.log("Exporting to Excel...");
    setShowExportDropdown(false);
  };

  const handleExportPDF = () => {
    console.log("Exporting to PDF...");
    setShowExportDropdown(false);
  };

  const handleCategoryClick = (category) => {
    setActiveCategoryModal(category);
  };

  const handleCloseCategoryModal = () => {
    setActiveCategoryModal(null);
  };

  const handleViewDetail = (order) => {
    setTransactionDetail(order);
  };

  const handleCloseTransactionDetail = () => {
    setTransactionDetail(null);
  };

  // Pagination logic
  const totalPages = Math.ceil(mockSalesData.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentEntries = mockSalesData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#111827]">Sales Report</h1>
        <p className="text-sm text-[#6b7280]">Today, Monday 30 September 2024</p>
      </div>

      {/* Stats Cards */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-6">
            {/* Total Order */}
            <div className="rounded-xl border border-[#edf1f7] bg-white p-4">
              <div className="flex items-center gap-2 text-[#6b7280]">
                <FileIcon />
                <span className="text-xs">Total Order</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-[#111827]">100</p>
            </div>

            {/* Total Omzet */}
            <div className="rounded-xl border border-[#edf1f7] bg-white p-4">
              <div className="flex items-center gap-2 text-[#6b7280]">
                <ReceiptIcon />
                <span className="text-xs">Total Omzet</span>
              </div>
              <p className="mt-2 text-xl font-bold text-[#111827]">{formatPrice(2000000)}</p>
            </div>

            {/* All Menu Sales */}
            <div className="rounded-xl border border-[#edf1f7] bg-white p-4">
              <div className="flex items-center gap-2 text-[#6b7280]">
                <MenuIcon />
                <span className="text-xs">All Menu Sales</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-[#111827]">100</p>
            </div>

            {/* Foods */}
            <div className="relative rounded-xl border border-[#edf1f7] bg-white p-4">
              <div className="flex items-center gap-2 text-[#6b7280]">
                <FoodIcon />
                <span className="text-xs">Foods</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-[#111827]">25</p>
              <button
                type="button"
                onClick={() => handleCategoryClick("foods")}
                className="absolute bottom-3 right-3 text-[#3b5bdb] hover:text-[#3552c7]"
              >
                <ExternalLinkIcon />
              </button>
            </div>

            {/* Beverages */}
            <div className="relative rounded-xl border border-[#edf1f7] bg-white p-4">
              <div className="flex items-center gap-2 text-[#6b7280]">
                <BeverageIcon />
                <span className="text-xs">Beverages</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-[#111827]">50</p>
              <button
                type="button"
                onClick={() => handleCategoryClick("beverages")}
                className="absolute bottom-3 right-3 text-[#3b5bdb] hover:text-[#3552c7]"
              >
                <ExternalLinkIcon />
              </button>
            </div>

            {/* Desserts */}
            <div className="relative rounded-xl border border-[#edf1f7] bg-white p-4">
              <div className="flex items-center gap-2 text-[#6b7280]">
                <DessertIcon />
                <span className="text-xs">Desserts</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-[#111827]">50</p>
              <button
                type="button"
                onClick={() => handleCategoryClick("desserts")}
                className="absolute bottom-3 right-3 text-[#3b5bdb] hover:text-[#3552c7]"
              >
                <ExternalLinkIcon />
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="rounded-xl border border-[#edf1f7] bg-white p-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
              {/* Start Date */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#4b5563]">Start</label>
                <div className="relative">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="h-11 w-full appearance-none rounded-lg border border-[#e6ebf3] px-4 pr-10 text-sm text-[#445067] outline-none transition-colors focus:border-[#3b5bdb]"
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#9aa3b2]">
                    <CalendarIcon />
                  </span>
                </div>
              </div>

              {/* Finish Date */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#4b5563]">Finish</label>
                <div className="relative">
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="h-11 w-full appearance-none rounded-lg border border-[#e6ebf3] px-4 pr-10 text-sm text-[#445067] outline-none transition-colors focus:border-[#3b5bdb]"
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#9aa3b2]">
                    <CalendarIcon />
                  </span>
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#4b5563]">Category</label>
                <div className="relative">
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="h-11 w-full appearance-none rounded-lg border border-[#e6ebf3] bg-white px-4 pr-10 text-sm text-[#445067] outline-none transition-colors focus:border-[#3b5bdb]"
                  >
                    <option value="">Select category</option>
                    <option value="foods">Foods</option>
                    <option value="beverages">Beverages</option>
                    <option value="desserts">Desserts</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#9aa3b2]">
                    <ChevronDownIcon />
                  </span>
                </div>
              </div>

              {/* Order Type Filter */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#4b5563]">Order Type</label>
                <div className="relative">
                  <select
                    value={orderTypeFilter}
                    onChange={(e) => setOrderTypeFilter(e.target.value)}
                    className="h-11 w-full appearance-none rounded-lg border border-[#e6ebf3] bg-white px-4 pr-10 text-sm text-[#445067] outline-none transition-colors focus:border-[#3b5bdb]"
                  >
                    <option value="">Select order type</option>
                    <option value="dine-in">Dine-in</option>
                    <option value="take-away">Take Away</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#9aa3b2]">
                    <ChevronDownIcon />
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-end gap-2">
                <button
                  type="button"
                  onClick={handleSearch}
                  className="h-11 flex-1 rounded-lg bg-[#3b5bdb] text-sm font-medium text-white transition-colors hover:bg-[#3552c7]"
                >
                  Search
                </button>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowExportDropdown(!showExportDropdown)}
                    className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#d1d5db] transition-colors hover:bg-[#f9fafb]"
                  >
                    <DownloadIcon />
                  </button>
                  
                  {showExportDropdown && (
                    <div className="absolute right-0 top-full mt-2 w-32 rounded-lg border border-[#edf1f7] bg-white py-2 shadow-lg">
                      <button
                        type="button"
                        onClick={handleExportExcel}
                        className="w-full px-4 py-2 text-left text-sm text-[#445067] transition-colors hover:bg-[#f9fafb]"
                      >
                        Export Excel
                      </button>
                      <button
                        type="button"
                        onClick={handleExportPDF}
                        className="w-full px-4 py-2 text-left text-sm text-[#445067] transition-colors hover:bg-[#f9fafb]"
                      >
                        Export PDF
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-xl border border-[#edf1f7] bg-white">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-[#edf1f7] bg-[#f9fafb]">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#4b5563]">No Order</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#4b5563]">Order Date</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#4b5563]">Order Type</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#4b5563]">Category</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#4b5563]">Customer Name</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-[#4b5563]">Detail</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#edf1f7]">
                  {currentEntries.map((order) => (
                    <tr key={order.id} className="hover:bg-[#f9fafb]">
                      <td className="px-4 py-3 text-sm text-[#445067]">{order.id}</td>
                      <td className="px-4 py-3 text-sm text-[#445067]">{order.date}</td>
                      <td className="px-4 py-3 text-sm text-[#445067]">{order.type}</td>
                      <td className="px-4 py-3 text-sm text-[#445067]">{order.category}</td>
                      <td className="px-4 py-3 text-sm text-[#445067]">{order.customer}</td>
                      <td className="px-4 py-3 text-center">
                        <button
                          type="button"
                          onClick={() => handleViewDetail(order)}
                          className="inline-flex items-center justify-center text-[#3b5bdb] transition-colors hover:text-[#3552c7]"
                        >
                          <ExternalLinkIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-[#edf1f7] px-4 py-3">
              <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                <span>Show:</span>
                <select
                  value={entriesPerPage}
                  onChange={(e) => {
                    setEntriesPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="rounded border border-[#e6ebf3] px-2 py-1 text-sm outline-none focus:border-[#3b5bdb]"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <span>Entries</span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e6ebf3] text-sm text-[#6b7280] transition-colors hover:bg-[#f9fafb] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {"<"}
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => handlePageChange(page)}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-colors ${
                      currentPage === page
                        ? "bg-[#3b5bdb] text-white"
                        : "text-[#6b7280] hover:bg-[#f9fafb]"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e6ebf3] text-sm text-[#6b7280] transition-colors hover:bg-[#f9fafb] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {">"}
                </button>
              </div>
            </div>
          </div>

      {/* Modals */}
      <CategorySalesModal
        isOpen={!!activeCategoryModal}
        onClose={handleCloseCategoryModal}
        category={activeCategoryModal}
        data={mockCategorySales[activeCategoryModal] || []}
      />

      <TransactionDetailModal
        isOpen={!!transactionDetail}
        onClose={handleCloseTransactionDetail}
        order={transactionDetail}
      />
    </div>
  );
}
