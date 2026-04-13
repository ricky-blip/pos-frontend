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
 */
export default function CategoryPopup({ isOpen, onClose, title, items, searchPlaceholder = "Enter the keyword here..." }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#111827]">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-[#6b7280] transition-colors hover:bg-[#f3f4f6]"
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
            className="h-10 w-full rounded-lg border border-[#e5e7eb] bg-white py-2 pl-9 pr-4 text-sm text-[#111827] placeholder-[#9ca3af] focus:border-[#3b5bdb] focus:outline-none focus:ring-1 focus:ring-[#3b5bdb]"
          />
        </div>

        {/* Table */}
        <div className="max-h-96 overflow-y-auto rounded-lg border border-[#e5e7eb]">
          <table className="w-full">
            <thead className="sticky top-0 bg-[#f9fafb]">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#111827]">
                  Menu Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#111827]">
                  Total Sales
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb] bg-white">
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-3 text-sm text-[#111827]">{item.name}</td>
                  <td className="px-4 py-3 text-sm text-[#111827]">{item.sales}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
