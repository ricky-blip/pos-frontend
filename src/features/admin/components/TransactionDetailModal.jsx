import { useState } from "react";
import PropTypes from "prop-types";

/**
 * TransactionDetailModal - Modal untuk menampilkan detail transaksi
 */
export default function TransactionDetailModal({ isOpen, onClose, transaction }) {
  if (!isOpen || !transaction) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#e5e7eb]">
          <h2 className="text-2xl font-bold text-[#111827]">Transaction Detail</h2>
          <button
            onClick={onClose}
            className="text-[#6b7280] hover:text-[#111827] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="bg-gray-50 rounded-lg p-4">
            {/* Order Info */}
            <div className="space-y-1 mb-4">
              <p className="text-xs text-[#6b7280]">
                <span className="font-medium text-gray-900 border-b border-gray-100 pb-1 flex justify-between">
                  <span>No Invoice</span> 
                  <span className="text-blue-600">#{transaction.invoiceNumber}</span>
                </span>
              </p>
              <div className="pt-2 space-y-1">
                <p className="text-xs text-[#6b7280]">
                  <span className="font-medium">Date:</span> {formatDate(transaction.createdAt)}
                </p>
                <p className="text-xs text-[#6b7280]">
                  <span className="font-medium">Customer:</span> {transaction.customerName || "Guest"}
                </p>
                <p className="text-xs text-[#6b7280]">
                  <span className="font-medium">Payment:</span> {transaction.paymentMethod?.toUpperCase()}
                </p>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-3 py-3 border-t border-b border-gray-100 border-dashed">
              {transaction.items?.map((item, index) => (
                <div key={index}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[#111827]">{item.menu?.name || "Unknown Item"}</p>
                      <p className="text-xs text-[#6b7280]">
                        {item.quantity} x {formatPrice(item.priceAtTransaction)}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-[#111827]">
                      {formatPrice(item.subtotal)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[#6b7280]">Sub Total</span>
                <span className="text-[#111827]">{formatPrice(transaction.totalOriginal)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#6b7280]">Tax (PPN 11%)</span>
                <span className="text-[#111827]">{formatPrice(transaction.totalTax)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-100">
                <span className="text-sm font-bold text-[#111827]">Total</span>
                <span className="text-xl font-bold text-blue-600">
                  {formatPrice(transaction.totalFinal)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

TransactionDetailModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  transaction: PropTypes.shape({
    invoiceNumber: PropTypes.string,
    createdAt: PropTypes.string,
    customerName: PropTypes.string,
    paymentMethod: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        menu: PropTypes.object,
        quantity: PropTypes.number,
        priceAtTransaction: PropTypes.number,
        subtotal: PropTypes.number,
      })
    ),
    totalOriginal: PropTypes.number,
    totalTax: PropTypes.number,
    totalFinal: PropTypes.number,
  }),
};

TransactionDetailModal.defaultProps = {
  transaction: null,
};
