import { useEffect } from "react";

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

function ArchiveIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

// Mock archived orders data
const mockArchivedOrders = [
  {
    id: "ORD#1234567890",
    customerName: "John Doe",
    orderType: "Dine In",
    tableNumber: "5",
    total: 150000,
    items: 5,
    timestamp: "2026-04-10 14:30:00",
    status: "completed",
  },
  {
    id: "ORD#0987654321",
    customerName: "Jane Smith",
    orderType: "Take Away",
    tableNumber: "-",
    total: 85000,
    items: 3,
    timestamp: "2026-04-10 13:15:00",
    status: "completed",
  },
  {
    id: "ORD#1122334455",
    customerName: "Bob Johnson",
    orderType: "Dine In",
    tableNumber: "12",
    total: 220000,
    items: 8,
    timestamp: "2026-04-10 12:00:00",
    status: "completed",
  },
];

/**
 * OrderArchiveModal - Modal to view archived/completed orders
 * @param {boolean} isOpen - Whether the modal is open
 * @param {Function} onClose - Callback to close the modal
 */
export default function OrderArchiveModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative z-10 h-[80vh] w-full max-w-4xl rounded-2xl bg-white p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#f0f3ff] p-2 text-[#3b5bdb]">
              <ArchiveIcon />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[#111827]">Order Archive</h2>
              <p className="text-sm text-[#9aa3b2]">View completed transactions</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#dce3ef] p-2 text-[#9aa3b2] transition-colors hover:border-red-400 hover:text-red-500"
            aria-label="Close modal"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Orders List */}
        <div className="h-[calc(100%-100px)] overflow-y-auto">
          {mockArchivedOrders.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-4 rounded-full bg-[#f3f5f9] p-6">
                <ArchiveIcon />
              </div>
              <p className="text-lg font-medium text-[#111827]">No archived orders</p>
              <p className="mt-1 text-sm text-[#9aa3b2]">Completed orders will appear here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {mockArchivedOrders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-xl border border-[#dce3ef] p-4 transition-shadow hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-[#111827]">{order.id}</h3>
                        <span className="rounded-md bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                          {order.status}
                        </span>
                      </div>
                      
                      <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-[#6b7280]">
                        <div>
                          <span className="text-[#9aa3b2]">Customer:</span> {order.customerName}
                        </div>
                        <div>
                          <span className="text-[#9aa3b2]">Order Type:</span> {order.orderType}
                        </div>
                        <div>
                          <span className="text-[#9aa3b2]">Table:</span> {order.tableNumber}
                        </div>
                        <div>
                          <span className="text-[#9aa3b2]">Items:</span> {order.items}
                        </div>
                      </div>

                      <p className="mt-2 text-xs text-[#9aa3b2]">{order.timestamp}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-semibold text-[#3b5bdb]">
                        Rp {order.total.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
