import { useState } from "react";

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M11 5a6 6 0 104.24 10.24L20 20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
    </svg>
  );
}

export default function CategorySalesModal({ isOpen, onClose, category, data }) {
  const [searchKeyword, setSearchKeyword] = useState("");

  const categoryLabels = {
    foods: "Foods",
    beverages: "Beverages",
    desserts: "Desserts",
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  if (!isOpen || !category) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/20 px-4 py-8">
      <div className="relative w-full max-w-sm rounded-[16px] bg-white px-5 py-5 shadow-[0_30px_80px_rgba(15,23,42,0.25)]">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#111827]">
            {categoryLabels[category] || category}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-[#6b7280] transition-colors hover:text-[#111827]"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#b5bfd0]">
            <SearchIcon />
          </span>
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="Enter the keyword here..."
            className="h-10 w-full rounded-lg border border-[#e7ebf3] bg-white pl-10 pr-4 text-sm text-[#445067] outline-none transition-colors placeholder:text-[#c0c7d4] focus:border-[#3b5bdb]"
          />
        </div>

        {/* Table Header */}
        <div className="mb-2 grid grid-cols-2 gap-4 rounded-t-lg bg-[#f9fafb] px-4 py-2 text-xs font-semibold text-[#4b5563]">
          <span>Menu Name</span>
          <span className="text-right">Total Sales</span>
        </div>

        {/* Table Body */}
        <div className="max-h-[320px] overflow-y-auto">
          <div className="divide-y divide-[#edf1f7]">
            {filteredData.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-2 gap-4 px-4 py-3 text-sm text-[#445067]"
              >
                <span className="font-medium">{item.name}</span>
                <span className="text-right">{item.sales}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
