function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ArchiveIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="20" height="5" rx="1" stroke="currentColor" strokeWidth="2" />
      <path
        d="M4 8v11a2 2 0 002 2h12a2 2 0 002-2V8M10 12h4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * CashierHeader - Shared header component for all cashier pages
 * @param {Function} onOrderArchive - Callback when order archive button is clicked
 */
export default function CashierHeader({ onOrderArchive }) {
  return (
    <header className="sticky top-0 z-30 border-b border-[#e5e7eb] bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left Section: Search */}
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#9ca3af]">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Enter the keyword here..."
              className="h-10 w-96 rounded-lg border border-[#e5e7eb] bg-white py-2 pl-9 pr-4 text-sm text-[#111827] placeholder-[#9ca3af] focus:border-[#3b5bdb] focus:outline-none focus:ring-1 focus:ring-[#3b5bdb]"
            />
          </div>
        </div>

        {/* Right Section: Order Archive + User Profile + Logout */}
        <div className="flex items-center gap-4">
          {onOrderArchive && (
            <button
              type="button"
              onClick={onOrderArchive}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#6b7280] transition-colors hover:bg-[#f3f4f6] hover:text-[#3b5bdb]"
            >
              <ArchiveIcon />
              <span>Order Archive</span>
            </button>
          )}

          <div className="flex items-center gap-3 border-l border-[#e5e7eb] pl-4">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
              alt="User avatar"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-[#111827]">John Doe</p>
              <p className="text-xs text-[#9ca3af]">Cashier</p>
            </div>
            <button
              type="button"
              className="ml-2 rounded-lg p-2 text-[#ef4444] transition-colors hover:bg-red-50"
              aria-label="Logout"
            >
              <LogoutIcon />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
