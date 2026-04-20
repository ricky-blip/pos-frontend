import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../../../stores/useAuthStore";

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

function DashboardIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="3"
        y="3"
        width="7"
        height="9"
        rx="1"
        stroke={active ? "#3B5BDB" : "#9ca3af"}
        strokeWidth="2"
      />
      <rect
        x="14"
        y="3"
        width="7"
        height="5"
        rx="1"
        stroke={active ? "#3B5BDB" : "#9ca3af"}
        strokeWidth="2"
      />
      <rect
        x="14"
        y="12"
        width="7"
        height="9"
        rx="1"
        stroke={active ? "#3B5BDB" : "#9ca3af"}
        strokeWidth="2"
      />
      <rect
        x="3"
        y="16"
        width="7"
        height="5"
        rx="1"
        stroke={active ? "#3B5BDB" : "#9ca3af"}
        strokeWidth="2"
      />
    </svg>
  );
}

function SalesReportIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        stroke={active ? "#3B5BDB" : "#9ca3af"}
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
      <path
        d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3"
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
      <path
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        stroke={active ? "#3B5BDB" : "#9ca3af"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="12"
        r="3"
        stroke={active ? "#3B5BDB" : "#9ca3af"}
        strokeWidth="2"
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
 * AdminSidebar - Full-height sidebar with expandable states for admin
 */
export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);
  const [isExpanded, setIsExpanded] = useState(false);

  const getActiveItem = () => {
    const path = location.pathname;
    if (path.includes("/users")) return "users";
    if (path.includes("/logs")) return "logs";
    if (path.includes("/catalog")) return "catalog";
    if (path.includes("/sales-report")) return "sales-report";
    if (path.includes("/settings")) return "settings";
    return "dashboard";
  };

  const activeItem = getActiveItem();

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: (active) => <DashboardIcon active={active} />,
      path: "/admin/dashboard",
    },
    {
      id: "catalog",
      label: "Catalog",
      icon: (active) => <MenuIcon active={active} />,
      path: "/admin/catalog",
    },
    {
      id: "users",
      label: "Staf",
      icon: (active) => <DashboardIcon active={active} />,
      path: "/admin/users",
    },
    {
      id: "logs",
      label: "Activity Logs",
      icon: (active) => <SalesReportIcon active={active} />,
      path: "/admin/logs",
    },
    {
      id: "sales-report",
      label: "Sales Report",
      icon: (active) => <SalesReportIcon active={active} />,
      path: "/admin/sales-report",
    },
    {
      id: "settings",
      label: "Settings",
      icon: (active) => <SettingsIcon active={active} />,
      path: "/admin/settings",
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
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-[#3B5BDB] to-[#5B7BDB]">
                <span className="text-xl font-bold text-white">P</span>
              </div>
              <span className="text-lg font-bold text-[#111827]">PadiPos</span>
            </div>

            <button
              type="button"
              onClick={toggleSidebar}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#3B5BDB] transition-colors hover:bg-[#f0f3ff]"
              aria-label="Collapse sidebar"
            >
              <ArrowLeftIcon />
            </button>
          </div>
        ) : (
          <>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-[#3B5BDB] to-[#5B7BDB]">
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
              <div className="flex h-6 w-6 shrink-0 items-center justify-center">
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
          <div className="flex h-6 w-6 shrink-0 items-center justify-center">
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
