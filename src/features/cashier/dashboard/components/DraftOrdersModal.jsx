import PropTypes from "prop-types";

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function formatPrice(value) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

export default function DraftOrdersModal({ isOpen, onClose, drafts, onResume, onDelete }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl animate-scale-in max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-xl font-bold text-[#111827]">Held Orders (Drafts)</h2>
            <p className="text-sm text-gray-500">Resume orders that were put on hold.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-[#6b7280] transition-colors hover:bg-gray-100"
          >
            <CloseIcon />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {drafts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-gray-500">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-3 opacity-50">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <p>No held orders found.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {drafts.map((draft, index) => {
                const totalItems = draft.cartItems.reduce((sum, item) => sum + item.quantity, 0);
                const subtotal = draft.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
                const tax = Math.round(subtotal * 0.11);
                const total = subtotal + tax;

                return (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/30 transition-all">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">
                          {draft.orderType === "dine-in" ? `Dine-In (Table ${draft.tableNumber || "-"})` : "Take Away"}
                        </span>
                        {draft.customerName && (
                          <span className="px-2 py-0.5 rounded-md bg-gray-100 text-xs font-medium text-gray-600">
                            {draft.customerName}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {totalItems} items • {formatPrice(total)}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Held at: {new Date(draft.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onDelete(index)}
                        className="px-3 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        Discard
                      </button>
                      <button
                        onClick={() => onResume(index)}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                      >
                        Resume Order
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

DraftOrdersModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  drafts: PropTypes.array.isRequired,
  onResume: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
