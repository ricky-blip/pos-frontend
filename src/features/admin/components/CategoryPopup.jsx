function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * CategoryPopup - Modal component for displaying menu items by category
 * @param {boolean} isOpen - Whether the modal is open
 * @param {function} onClose - Callback to close the modal
 * @param {string} title - Title of the modal (e.g., "Foods", "Beverages", "Desserts")
 * @param {Array} items - Array of menu items [{ name: string, sales: number }]
 * @param {string} searchPlaceholder - Placeholder for search input
 * @param {boolean} isLoading - Whether the data is loading
 */
export default function CategoryPopup({ 
  isOpen, 
  onClose, 
  title, 
  items = [], 
  searchPlaceholder = "Enter the keyword here...",
  isLoading = false
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#111827]">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-[#6b7280] transition-colors hover:bg-gray-100"
            aria-label="Close modal"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Search */}
        <div className="mb-4 relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#9ca3af]">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="h-11 w-full rounded-xl border border-[#e5e7eb] bg-gray-50 py-2 pl-10 pr-4 text-sm text-[#111827] focus:border-[#3b5bdb] focus:outline-none focus:ring-1 focus:ring-[#3b5bdb] transition-all"
          />
        </div>

        {/* Table Content */}
        <div className="max-h-96 overflow-hidden rounded-xl border border-[#e5e7eb]">
          <div className="overflow-y-auto max-h-80">
            <table className="w-full text-left">
              <thead className="sticky top-0 bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Menu Name
                  </th>
                  <th className="px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">
                    Sold
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 bg-white">
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-5 py-4"><div className="h-4 bg-gray-100 rounded w-3/4"></div></td>
                      <td className="px-5 py-4"><div className="h-4 bg-gray-100 rounded w-1/4 ml-auto"></div></td>
                    </tr>
                  ))
                ) : items.length > 0 ? (
                  items.map((item, index) => (
                    <tr key={index} className="hover:bg-blue-50/30 transition-colors">
                      <td className="px-5 py-4 text-sm font-medium text-gray-700">{item.name}</td>
                      <td className="px-5 py-4 text-sm font-bold text-blue-600 text-right">{item.sales} porsi</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="px-5 py-10 text-center text-sm text-gray-400 italic">
                      Belum ada data penjualan untuk kategori ini
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

