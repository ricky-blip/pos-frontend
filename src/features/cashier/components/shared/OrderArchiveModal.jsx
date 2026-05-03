import { useEffect, useState } from "react";
import transactionService from "../../../shared/services/transaction.service";

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

/**
 * OrderArchiveModal - Modal to view archived/completed orders
 * @param {boolean} isOpen - Whether the modal is open
 * @param {Function} onClose - Callback to close the modal
 */
export default function OrderArchiveModal({ isOpen, onClose }) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      fetchOrders();
    }
  }, [isOpen]);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await transactionService.getTransactionHistory();
      setOrders(data || []);
    } catch (err) {
      console.error("Failed to fetch order archive:", err);
      setError("Gagal memuat riwayat pesanan.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative z-10 h-[80vh] w-full max-w-4xl rounded-2xl bg-white p-6 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#f0f3ff] p-2 text-[#3b5bdb]">
              <ArchiveIcon />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[#111827]">Order Archive</h2>
              <p className="text-sm text-[#9aa3b2]">View completed transactions</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchOrders}
              className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              🔄 Refresh
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#dce3ef] p-2 text-[#9aa3b2] transition-colors hover:border-red-400 hover:text-red-500"
              aria-label="Close modal"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {isLoading ? (
            <div className="flex h-full flex-col items-center justify-center space-y-3">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm text-gray-500">Memuat riwayat...</p>
            </div>
          ) : error ? (
            <div className="flex h-full flex-col items-center justify-center text-center p-6">
              <p className="text-red-500 mb-2 font-medium">{error}</p>
              <button 
                onClick={fetchOrders}
                className="text-sm text-blue-600 underline"
              >
                Coba lagi
              </button>
            </div>
          ) : orders.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-4 rounded-full bg-[#f3f5f9] p-6 text-gray-400">
                <ArchiveIcon />
              </div>
              <p className="text-lg font-medium text-[#111827]">No archived orders</p>
              <p className="mt-1 text-sm text-[#9aa3b2]">Completed orders will appear here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-xl border border-[#dce3ef] p-4 transition-shadow hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-[#111827]">{order.invoiceNumber}</h3>
                        <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                          order.payment?.status === 'completed' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {order.payment?.status || 'completed'}
                        </span>
                      </div>
                      
                      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 text-sm text-[#6b7280]">
                        <div>
                          <span className="text-[#9aa3b2]">Customer:</span> {order.customerName}
                        </div>
                        <div>
                          <span className="text-[#9aa3b2]">Method:</span> <span className="capitalize">{order.payment?.method}</span>
                        </div>
                        <div>
                          <span className="text-[#9aa3b2]">Items:</span> {order.items?.length || 0} items
                        </div>
                      </div>

                      <p className="mt-2 text-xs text-[#9aa3b2]">
                        {new Date(order.date).toLocaleString("id-ID")}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-semibold text-[#3b5bdb]">
                        Rp {order.totals?.final.toLocaleString("id-ID")}
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
