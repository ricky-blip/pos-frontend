import { createPortal } from "react-dom";

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function formatPrice(value) {
  return `Rp ${Number(value || 0).toLocaleString("id-ID")}`;
}

function formatDate(dateStr) {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleString("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function TransactionDetailModal({ isOpen, onClose, transaction }) {
  if (!isOpen || !transaction) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 py-8">
      {/* Clickable backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md rounded-[22px] bg-white px-7 py-8 shadow-[0_30px_80px_rgba(15,23,42,0.25)]">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-[#6b7280] transition-colors hover:text-[#111827]"
        >
          <CloseIcon />
        </button>

        {/* Title */}
        <h2 className="mb-5 text-center text-xl font-semibold text-[#111827]">
          Transaction Detail
        </h2>

        {/* Order Info */}
        <div className="rounded-xl bg-[#f7f8fb] p-4">
          <div className="space-y-1.5 text-xs text-[#7f8797] border-b border-dashed border-[#d7deea] pb-3 mb-3">
            <div className="flex justify-between">
              <span className="font-medium text-[#111827]">No Invoice:</span>
              <span className="font-semibold text-blue-600">{transaction.invoiceNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-[#111827]">Tanggal:</span>
              <span>{formatDate(transaction.createdAt)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-[#111827]">Customer:</span>
              <span>{transaction.customerName || "Guest"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-[#111827]">Pembayaran:</span>
              <span className="uppercase font-semibold">{transaction.paymentMethod}</span>
            </div>
          </div>

          {/* Item Details */}
          {transaction.items && transaction.items.length > 0 ? (
            <div className="space-y-2 border-b border-dashed border-[#d7deea] pb-3 mb-3">
              {transaction.items.map((item, index) => (
                <div key={index} className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#2b2f38]">
                      {item.menu?.name || "Item"}
                    </p>
                    <p className="text-[11px] text-[#7f8797]">
                      {item.quantity} x {formatPrice(item.priceAtTransaction)}
                    </p>
                    {item.note && (
                      <p className="text-[10px] text-gray-400 italic">{item.note}</p>
                    )}
                  </div>
                  <p className="text-xs font-medium text-[#2b2f38]">
                    {formatPrice(item.subtotal)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400 text-center py-2">Tidak ada item</p>
          )}

          {/* Summary */}
          <div className="space-y-2 text-xs text-[#7f8797]">
            <div className="flex items-center justify-between">
              <span>Sub Total</span>
              <span>{formatPrice(transaction.totalOriginal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>PPN (11%)</span>
              <span>{formatPrice(transaction.totalTax)}</span>
            </div>
            {Number(transaction.totalDiscount) > 0 && (
              <div className="flex items-center justify-between text-green-600">
                <span>Diskon</span>
                <span>- {formatPrice(transaction.totalDiscount)}</span>
              </div>
            )}
            <div className="flex items-center justify-between pt-2 border-t border-dashed border-[#d7deea] text-[#2b2f38]">
              <span className="text-base font-semibold">Total</span>
              <span className="text-2xl font-bold text-blue-600">{formatPrice(transaction.totalFinal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
