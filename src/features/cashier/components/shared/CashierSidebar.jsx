import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../../../../stores/useAuthStore";

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 18l6-6-6-6"
        stroke="#3B5BDB"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M15 18l-6-6 6-6"
        stroke="#3B5BDB"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect 
        x="3" 
        y="3" 
        width="18" 
        height="18" 
        rx="2" 
        stroke={active ? "#3B5BDB" : "#9ca3af"} 
        strokeWidth="2" 
      />
      <path 
        d="M9 9h6M9 12h6M9 15h6" 
        stroke={active ? "#3B5BDB" : "#9ca3af"} 
        strokeWidth="2" 
        strokeLinecap="round" 
      />
    </svg>
  );
}

function SalesReportIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
        stroke={active ? "#3B5BDB" : "#9ca3af"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path 
        d="M14 2v6h6M16 13H8M16 17H8M10 9H8" 
        stroke={active ? "#3B5BDB" : "#9ca3af"} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
}

function SettingsIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3" stroke={active ? "#3B5BDB" : "#9ca3af"} strokeWidth="2" />
      <path
        d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"
        stroke={active ? "#3B5BDB" : "#9ca3af"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"
        stroke="#ef4444"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * CashierSidebar - Full-height sidebar with expandable states
 */
export default function CashierSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);
  const [isExpanded, setIsExpanded] = useState(false);

  const getActiveItem = () => {
    const path = location.pathname;
    if (path.includes("/sales-report")) return "sales-report";
    if (path.includes("/settings")) return "settings";
    return "menu";
  };

  const activeItem = getActiveItem();

  const menuItems = [
    {
      id: "menu",
      label: "Cashier",
      icon: (active) => <MenuIcon active={active} />,
      path: "/dashboard",
    },
    {
      id: "sales-report",
      label: "Sales Report",
      icon: (active) => <SalesReportIcon active={active} />,
      path: "/dashboard/sales-report",
    },
    {
      id: "settings",
      label: "Settings",
      icon: (active) => <SettingsIcon active={active} />,
      path: "/dashboard/settings",
    },
  ];

  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin keluar?")) {
      logout();
      navigate("/");
    }
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <aside 
      className={`relative flex h-dvh flex-col border-r border-[#e5e7eb] bg-white transition-all duration-300 ${
        isExpanded ? "w-64" : "w-20"
      }`}
    >
      {/* Logo Section */}
      <div className="flex flex-col items-center border-b border-[#e5e7eb] px-4 py-4">
        {isExpanded ? (
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#3B5BDB] to-[#5B7BDB]">
                <span className="text-xl font-bold text-white">P</span>
              </div>
              <span className="text-lg font-bold text-[#111827]">PadiPos</span>
            </div>
            
            <button
              type="button"
              onClick={toggleSidebar}
              className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-[#3B5BDB] transition-colors hover:bg-[#f0f3ff]"
              aria-label="Collapse sidebar"
            >
              <ArrowLeftIcon />
            </button>
          </div>
        ) : (
          <>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#3B5BDB] to-[#5B7BDB]">
              <span className="text-xl font-bold text-white">P</span>
            </div>
            <div className="mt-3 w-full border-t border-[#e5e7eb]"></div>
            <button
              type="button"
              onClick={toggleSidebar}
              className="mt-3 flex h-7 w-7 items-center justify-center rounded-full border border-[#3B5BDB] transition-colors hover:bg-[#f0f3ff]"
              aria-label="Expand sidebar"
            >
              <ArrowRightIcon />
            </button>
          </>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {menuItems.map((item) => {
          const isActive = activeItem === item.id;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`relative flex items-center gap-3 rounded-lg px-3 py-3 transition-all ${
                isActive
                  ? "bg-[#f0f3ff] text-[#3b5bdb]"
                  : "text-[#9ca3af] hover:bg-[#f9fafb] hover:text-[#3b5bdb]"
              }`}
            >
              {isActive && (
                <div className="absolute right-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-l bg-[#3b5bdb]" />
              )}
              <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center">
                {item.icon(isActive)}
              </div>
              {isExpanded && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="mt-auto border-t border-[#e5e7eb] p-3">
        <button
          onClick={handleLogout}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-red-500 transition-all hover:bg-red-50`}
        >
          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center">
            <LogoutIcon />
          </div>
          {isExpanded && (
            <span className="text-sm font-medium">Logout</span>
          )}
        </button>
      </div>
    </aside>
  );
}
